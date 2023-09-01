import { userApiUrl } from "../globalVariables/globalVariables";
import axios from "axios";
import Cookies from "js-cookie";

export async function RegisterNewUser(userInfos: any){
    const response: any = await axios.post(`${userApiUrl}/createUser`,userInfos);
    if (response.data.auth === false) {
        return response;
    }
    Cookies.set("token", response.data.token);
    Cookies.set("user", response.data.user);
    return response;
}