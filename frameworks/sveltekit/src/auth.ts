import type { JWT } from '@auth/core/jwt';
import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import { env } from '$env/dynamic/private';
import { decodeJwtPayload } from '$lib/server/jwt';

async function refreshAccessToken(token: JWT): Promise<JWT> {
	if (!token.refreshToken) {
		return { ...token, error: 'RefreshAccessTokenError' };
	}

	const response = await fetch(`${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			client_id: env.AUTH_KEYCLOAK_ID ?? '',
			client_secret: env.AUTH_KEYCLOAK_SECRET ?? '',
			refresh_token: token.refreshToken
		})
	});

	if (!response.ok) {
		return { ...token, error: 'RefreshAccessTokenError' };
	}

	const tokens = await response.json();
	return {
		...token,
		accessToken: tokens.access_token,
		idToken: tokens.id_token ?? token.idToken,
		refreshToken: tokens.refresh_token ?? token.refreshToken,
		expiresAt: Math.floor(Date.now() / 1000) + tokens.expires_in,
		error: undefined
	};
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [Keycloak],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				return {
					...token,
					accessToken: account.access_token,
					idToken: account.id_token,
					refreshToken: account.refresh_token,
					expiresAt: account.expires_at
				};
			}

			if (token.expiresAt && Date.now() < (token.expiresAt - 30) * 1000) {
				return token;
			}

			return refreshAccessToken(token);
		},
		session({ session, token }) {
			return {
				...session,
				error: token.error,
				accessTokenClaims: decodeJwtPayload(token.accessToken),
				idTokenClaims: decodeJwtPayload(token.idToken)
			};
		}
	},
	events: {
		async signOut(message) {
			const refreshToken = 'token' in message ? message.token?.refreshToken : undefined;
			if (!refreshToken) {
				return;
			}

			await fetch(`${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`, {
				method: 'POST',
				body: new URLSearchParams({
					client_id: env.AUTH_KEYCLOAK_ID ?? '',
					client_secret: env.AUTH_KEYCLOAK_SECRET ?? '',
					refresh_token: refreshToken
				})
			});
		}
	}
});
