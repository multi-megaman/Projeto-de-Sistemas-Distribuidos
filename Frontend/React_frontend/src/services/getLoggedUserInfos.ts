export async function getLoggedUserInfos(request: any){
    // TO DO: Aqui entra a requisição para o backend para pegar a lista de URLs do usuário dado que o usuário já está logado
    // const response = await fetch('http://localhost:3333/urls', {requestBody: request})
    // const data = await response.json()
    // setUserURLList(data.urls)
    // reuturn data
    
    return ({links: ["https://www.reddit.com/r/Python/.rss", "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", "https://rss.art19.com/apology-line","https://feeds.fireside.fm/bibleinayear/rss" ,"https://g1.globo.com/dynamo/brasil/rss2.xml"], username: "Tonton"})
  }
  