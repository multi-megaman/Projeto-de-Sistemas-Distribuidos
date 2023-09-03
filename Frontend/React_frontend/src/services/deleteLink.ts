import { userApiUrl } from "../globalVariables/globalVariables";
import axios from "axios";
import Cookies from "js-cookie";

export async function deleteLink(link: string){
    const response: any = await axios.post(`${userApiUrl}/user/deleteLink`,{url: link},{headers: {"x-access-token": Cookies.get("token")}}
    );
    // Se algum erro acontecer, retorna a resposta apenas
    if (response.data.error === true) {
        return response.data;
    }
    // Se não, salva o token no cookie e retorna a resposta
    // Cookies.set("token", response.data.token);
    return response.data;
}
    
    // return ({links: ["https://www.reddit.com/r/Python/.rss", "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", "https://rss.art19.com/apology-line","https://feeds.fireside.fm/bibleinayear/rss" ,"https://g1.globo.com/dynamo/brasil/rss2.xml"], name: "Tonton"})
  