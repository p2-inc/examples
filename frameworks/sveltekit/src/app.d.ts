import '@auth/sveltekit';

declare module '@auth/sveltekit' {
	interface Session {
		error?: 'RefreshAccessTokenError';
		accessTokenClaims?: Record<string, unknown>;
		idTokenClaims?: Record<string, unknown>;
	}
}

declare module '@auth/core/jwt' {
	interface JWT {
		accessToken?: string;
		idToken?: string;
		refreshToken?: string;
		expiresAt?: number;
		error?: 'RefreshAccessTokenError';
	}
}
