function cadastrar(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const nome = document.getElementById("nome").value;

    // Armazenando informações no localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);
    localStorage.setItem("nome", nome);

    // Redirecionando para a página de login
    window.location.href = "login.html";
}

// Associando a função cadastrar ao evento de envio do formulário
document.getElementById('formCadastro').onsubmit = cadastrar; 

function alterarFormulario(tipo) {
    const labelNome = document.getElementById("labelNome");
    const representante = document.getElementById("representante");
    const labelRepresentante = document.getElementById("labelRepresentante");
    const cpfInput = document.getElementById("cpf");
    const nomeInput = document.getElementById("nome");
    const labelCpfCnpj = document.getElementById("labelCpfCnpj");

    // Limpar o valor do campo CPF/CNPJ
    cpfInput.value = '';

    if (tipo === "fisica") {
        labelNome.textContent = "Nome";
        nomeInput.placeholder = "Digite seu nome";
        labelRepresentante.style.display = "none";
        representante.style.display = "none";
        cpfInput.placeholder = "Digite seu CPF";
        labelCpfCnpj.textContent = "CPF";
        aplicarMascaraCPF(cpfInput);
    } else {
        labelNome.textContent = "Razão Social";
        nomeInput.placeholder = "Digite a Razão Social";
        labelRepresentante.style.display = "block";
        representante.style.display = "block";
        cpfInput.placeholder = "Digite seu CNPJ";
        labelCpfCnpj.textContent = "CNPJ";
        aplicarMascaraCNPJ(cpfInput);
    }
}

// Máscaras para CPF
function aplicarMascaraCPF(input) {
    $(input).off('input').on('input', function() {
        let value = input.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        input.value = value; 
    });
}

// Máscaras para CNPJ
function aplicarMascaraCNPJ(input) {
    $(input).off('input').on('input', function() {
        let value = input.value.replace(/\D/g, '');

        if (value.length > 14) {
            value = value.slice(0, 14);
        }

        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');

        input.value = value; 
    });
}

// Máscaras para telefone
function aplicarMascaraTelefone(input) {
    $(input).on('input', function() {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        input.value = value.slice(0, 15);
    });
}

// Função de inicialização
window.onload = function() {
    aplicarMascaraCPF(document.getElementById("cpf"));
    aplicarMascaraTelefone(document.getElementById("telefone"));
    
    // Define os eventos de clique para os botões de tipo de conta
    document.getElementById("fisica").onclick = function() {
        alterarFormulario("fisica");
    };
    
    document.getElementById("juridica").onclick = function() {
        alterarFormulario("juridica");
    };
};
