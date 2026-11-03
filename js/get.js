//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-jogos");
const modelo = document.querySelector("#modelo-jogo");

const apiKey="cv_A-LaiBT44ILbO_82lFlMUYYLL6I5H6DtUjRsnGwW1u_QBog2EEIxtlmxt_95EfFA";
const apiUrl="https://api-ds.codeverse.dev.br/api/jogos";

//Funcao que busca todos os herois da API

async function buscarJogos() {
  resposta.Content = "Carregando jogos..."

  try {
    //Fazer uma requisicao GET para buscar os herois
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os herois")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os herois e montar o heroi.

    for (const jogo of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = jogo.title;
      card.querySelector(".genero").textContent = jogo.genero;
      card.querySelector(".plataforma").textContent = jogo.plataforma;
      card.querySelector(".ano_lancamento").textContent = jogo.ano_lancamento;
      card.querySelector(".desenvolvedora").textContent = jogo.desenvolvedora;

      const imagem = card.querySelector("img");

      if(jogo.imageUrl){
        imagem.src = jogo.imageUrl;
        imagem.alt =  jogo.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os jogos. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarJogos();