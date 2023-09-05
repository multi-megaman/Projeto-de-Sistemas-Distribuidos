import { feedApiUrl } from "../globalVariables/globalVariables"
import axios from 'axios'
export async function getRSSFeedFromList(urlList: any, qnt: number) {

    try{
      const formData = new FormData();
      // formData.append("images", images);
      urlList.forEach((url: any) => {
        formData.append(`urlList`, url);
      });
      const response = await axios.post(`${feedApiUrl}/getFeedFromList`, urlList) // 'http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FPython%2F.rss'
      // console.log(response)
        return response
    }catch(err){
      // alert("Erro ao conectar com a API (Verifique se a API está rodando)")
      return {status: "error", message: "Erro ao conectar com a API (Verifique se a API está rodando)"}
      throw new Error("Erro ao conectar com a API (Verifique se a API está rodando))")
    }
  }
