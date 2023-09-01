import { userApiUrl } from "../globalVariables/globalVariables";
import axios from "axios";
import Cookies from "js-cookie";

export async function makeLogin(userInfos: any){
    const response: any = await axios.post(`${userApiUrl}/login`,userInfos);
    // Se algum erro acontecer, retorna a resposta apenas
    if (response.data.auth === false) {
        return response;
    }
    // Se não, salva o token no cookie e retorna a resposta
    Cookies.set("token", response.data.token);
    Cookies.set("user", response.data.user);
    return response;
}