//Carrega API Rick and Morty
const apiUrl = "https://rickandmortyapi.com/api/character"

// Seleciona o container onde os cards serão inseridos
const cardsContainer = document.getElementById("cards-container")

//Função para carregar personagens aleatórios
function carregarPersonagensAleatorios() {
    const totalPersonagens = 826
    const idsAleatorios = gerarIdsAleatorios(24, totalPersonagens)
    const urlComIds = `${apiUrl}/${idsAleatorios.join(",")}`


    fetch(urlComIds)
    .then(response => response.json())
    .then(data => {
        const personagens = Array.isArray(data) ? data : [data]
        criarCards(personagens)
        }
    )
    .catch(error => console.error("Erro ao carregar os personagens:", error))
}

// Função para gerar IDs aleatórios únicos
function gerarIdsAleatorios(qtd, max) {
    const ids = new Set()
    while (ids.size < qtd) {
        const id = Math.floor(Math.random() * max) + 1
        ids.add(id)
    }
    return Array.from(ids)
}

// Função para criar e inserir os cards no container
function criarCards(personagens) {
    
    cardsContainer.replaceChildren()
    personagens.forEach(personagem => {

        const card = document.createElement("div")
        card.classList.add("card")

        const imagem = document.createElement("img")
        imagem.src = personagem.image
        imagem.alt = personagem.name

        const nome = document.createElement("h2")
        nome.textContent = personagem.name

        const status = document.createElement("p")
        status.textContent = `Status: ${personagem.status}`

        const especie = document.createElement("p");
        especie.textContent = `Espécie: ${personagem.species}`

        card.appendChild(imagem)
        card.appendChild(nome)
        card.appendChild(status)
        card.appendChild(especie)

        cardsContainer.appendChild(card)
    })
}

// Chama a função assim que a página carrega
carregarPersonagensAleatorios()
