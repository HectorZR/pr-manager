import * as vscode from 'vscode';
import { GetGithubAccess } from '../services/GetGithubAccess';
import { GITHUB_PROVIDER } from '../constants/gitProviders';

export class AuthUriHandler {
	constructor(public context: vscode.ExtensionContext) {
		this.handleUri = this.handleUri.bind(this);
	}

	handleUri(uri: vscode.Uri) {
		const queryParams = new URLSearchParams(uri.query);
		const isGithubProvider =
			this.context.globalState.get('gitProvider') === GITHUB_PROVIDER;

		const authCode = queryParams.get('code');
		const stateCode = queryParams.get('state');
		if (isGithubProvider && authCode && stateCode) {
			GetGithubAccess.getAccessToken(authCode, stateCode);
		}
	}

	registerUriHandler() {
		vscode.window.registerUriHandler({
			handleUri: this.handleUri,
		});
	}
}
