// Função assíncrona para buscar artigos relacionados a um tópico específico
async function buscarArtigosRelacionados(topico) {
    try {
        // Codifica o tópico para uso na URL
        const topicoCodificado = encodeURIComponent(topico);

        // Realiza uma requisição para obter páginas relacionadas ao tópico
        let resposta = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${topicoCodificado}&format=json&origin=*`);
        let dados = await resposta.json();

        // Verifica se foram encontrados resultados
        if (dados.query.search.length === 0) {
            console.log(`Não foram encontrados artigos com o tópico "${topico}".`);
            return;
        }

        console.log(`Artigos encontrados sobre "${topico}":`);
        // Processa cada artigo encontrado
        for (const artigo of dados.query.search) {
            // Busca mais detalhes para cada artigo
            const detalhes = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=info|extracts&pageids=${artigo.pageid}&inprop=url&format=json&origin=*&exintro=true`);
            const dadosDetalhes = await detalhes.json();
            const pagina = dadosDetalhes.query.pages[artigo.pageid];

            // Loga o título, URL e um resumo do artigo
            console.log(`Título: ${pagina.title}`);
            console.log(`URL: ${pagina.fullurl}`);
            console.log(`Resumo: ${pagina.extract}`);
            console.log('---');
        }

    } catch (erro) {
        console.error('Erro ao buscar artigos:', erro);
    }
}

// Lista de tópicos de interesse (modifique com seus próprios tópicos)
const topicos = ['Computação quântica', 'Aprendizado de máquina', 'Judaísmo'];

// Realiza a busca por cada tópico na lista
topicos.forEach(topico => {
    console.log(`Buscando informações sobre o tópico: ${topico}`);
    buscarArtigosRelacionados(topico);
});
