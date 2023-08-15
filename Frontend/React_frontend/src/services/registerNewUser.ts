import { apiUrl } from "../globalVariables/globalVariables";
import Cookies from "js-cookie";
export async function RegisterNewUser(userInfos: any){
    const response: any = await fetch(`${apiUrl}/user/create`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userInfos)
    });
    Cookies.set("token", response.token);
    return response.json();
}