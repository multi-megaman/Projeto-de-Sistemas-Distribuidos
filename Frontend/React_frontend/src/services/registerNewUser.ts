import { userApiUrl } from "../globalVariables/globalVariables";
import axios from "axios";
// import Cookies from "js-cookie";
// export async function RegisterNewUser(userInfos: any){
//     const response: any = await fetch(`${userApiUrl}/createUser`, {
//         method: "POST",
//         mode: "cors",
//         body: userInfos
//     });
//     // Cookies.set("token", response.token);
//     console.log(response)
//     return response;
// }

export async function RegisterNewUser(userInfos: any){
    const response: any = await axios.post(`${userApiUrl}/createUser`,userInfos);
    // Cookies.set("token", response.token);
    console.log(response)
    return response;
}