// Botão para abrir o modal
const contatoButton = document.getElementById("contatoButton");
const contactModal = document.getElementById("contactModal");

// Abrir modal ao clicar no botão "Contato"
contatoButton.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
});

// Fechar modal ao clicar fora do conteúdo
contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
        contactModal.classList.add("hidden");
    }
});