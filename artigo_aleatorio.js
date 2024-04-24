// Função assíncrona para buscar um artigo aleatório baseado em um tópico específico
async function buscarArtigoAleatorio(topico) {
    try {
        // Codifica o tópico para uso na URL
        const topicoCodificado = encodeURIComponent(topico);

        // Realiza uma requisição para obter o ID de uma página aleatória relacionada ao tópico
        let resposta = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${topicoCodificado}&format=json&origin=*`);
        let dados = await resposta.json();

        // Verifica se foram encontrados resultados
        if (dados.query.search.length === 0) {
            console.log(`Não foram encontrados artigos com o tópico "${topico}".`);
            return;
        }

        // Escolhe aleatoriamente um dos resultados
        const artigoAleatorio = dados.query.search[Math.floor(Math.random() * dados.query.search.length)];

        // Busca os detalhes do artigo escolhido
        resposta = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=info|extracts&pageids=${artigoAleatorio.pageid}&inprop=url&format=json&origin=*&exintro=true`);
        dados = await resposta.json();
        const pagina = dados.query.pages[artigoAleatorio.pageid];

        // Loga o título e a URL do artigo
        console.log(`Título: ${pagina.title}`);
        console.log(`URL: ${pagina.fullurl}`);
        console.log(`Introdução: ${pagina.extract}`);

    } catch (erro) {
        console.error('Erro ao buscar artigos:', erro);
    }
}

// Lista de tópicos de interesse (modifique com seus próprios tópicos)
const topicos = ['Computação quântica', 'Aprendizado de máquina', 'Judaísmo'];

// Escolhe um tópico aleatório da lista e busca um artigo
const topicoAleatorio = topicos[Math.floor(Math.random() * topicos.length)];
console.log(`Buscando informações sobre o tópico: ${topicoAleatorio}`);
buscarArtigoAleatorio(topicoAleatorio);
