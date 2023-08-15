import { feedApiUrl } from "../globalVariables/globalVariables"
export async function getRSSFeedFromURL(url: string, qnt: number) {

    try{
      const response = await fetch(`${feedApiUrl}/getFeedFromURL?url=${url}&qnt=${qnt}`) // 'http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FPython%2F.rss'
      if (!response.ok) {
        // alert("Erro: a API retornou uma resposta inesperada")
        return null
        throw new Error("Erro: a API retornou uma resposta inesperada")
      }
        const data = await response.json()
        // setRSSfeed(data.Feed)
        return data.Feed
    }catch(err){
      // alert("Erro ao conectar com a API (Verifique se a API está rodando)")
      return null
      throw new Error("Erro ao conectar com a API (Verifique se a API está rodando))")
    }
  }
