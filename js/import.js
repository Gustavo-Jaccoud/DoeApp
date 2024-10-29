function loadContentIntoElement(elementId, filePath) {
    // Verifica se o elemento existe na página
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        // Faz o fetch do arquivo de conteúdo
        fetch(filePath)
            .then(response => {
                // Verifica se a requisição foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                // Insere o conteúdo no elemento de destino
                targetElement.innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    } else {
        console.error(`Elemento com ID "${elementId}" não foi encontrado.`);
    }
}