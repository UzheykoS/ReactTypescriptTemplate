import Helper, { BearerToken } from "../utils/helper";
import { setCookie, getCookie, checkCookie } from "../utils/cookieHelper";

export function configureOauth(
    authority: string,
    clientId: string,
    redirectUri: string,
    resourceIdentifier: string,
    tokenService: string
) {
    const baseRedirectUri = window.location.origin;
    const url = `${authority}/oauth2/authorize?response_type=code&client_id=${clientId}&resource=${resourceIdentifier}&redirect_uri=${baseRedirectUri}`;

    let xhr = new XMLHttpRequest();
    const code = Helper.getParameterByNameFromUri("code", window.location.href);
    if (!!code) {
        const tokerUrl = tokenService + "/oauth2/token?client_id=" + clientId + "&redirect_uri=" + baseRedirectUri + "&code=" + code;
        xhr.open('GET', tokerUrl, false);
        xhr.send();

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.response);
        } else {
            const token = JSON.parse(xhr.response);
            const bearerToken = {
                AccessToken: token["AccessToken"],
                ExpiresOn: new Date(token["ExpiresOn"])
            }
            setCookie(Helper.TokenCookieName, bearerToken.AccessToken, bearerToken.ExpiresOn.toUTCString());
            window.location.href = baseRedirectUri;
        }
    }
    else {
        window.location.href = url;
    }
}