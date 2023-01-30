import { Buffer } from 'buffer';

export function getToken(): Promise<unknown> {
	const p = new Promise((resolve, reject)  => {
		chrome.cookies.get(
			{ url: process.env.FRONT_URL, name: "auth2" },
			function (cookie):void {
				if (cookie && typeof cookie.value === 'string') {
					resolve(cookie.value);
				} else {
					resolve(false);
				}
			}
		);
	});
	return p;
}

export function isTokenValid(token: unknown): boolean {
	if(typeof token !== 'string') return false;
	const splitedToken = token.split('.');
	if(splitedToken.length !== 3) return false;
	const rawPayload = Buffer.from(splitedToken[1], 'base64').toString();

	let payload: {exp: number, iat: number};
	try {
		payload = JSON.parse(rawPayload);
	} catch {
		return false;
	}

	const exp = payload.exp;
	const iat = payload.iat;
	const now = Math.floor((new Date).getTime() / 1000);
	const timeLeft = exp - now;
	const initialDuration= iat - now;

	if(exp <= now){
		console.log("token expired");
		return false;
	} else if (timeLeft < initialDuration / 2){
		console.log("token will expire soon");
	} else {
		console.log("token is valid");
	}
	return true;
}

export async function toto(){
	const token = await getToken()
	isTokenValid(token);
}