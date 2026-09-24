export function decodeJwtPayload(token: string | undefined): Record<string, unknown> | undefined {
	const payload = token?.split('.')[1];
	if (!payload) {
		return undefined;
	}
	return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
}
