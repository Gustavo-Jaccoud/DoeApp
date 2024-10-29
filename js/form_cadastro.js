function cadastrar(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha); 

    window.location.href = "login.html";
}

document.getElementById('formCadastro').onsubmit = cadastrar; 

function alterarFormulario() {
    const tipoConta = document.querySelector('input[name="t_conta"]:checked').value;
    const labelNome = document.getElementById("labelNome");
    const representante = document.getElementById("representante");
    const labelRepresentante = document.getElementById("labelRepresentante");
    const cpfInput = document.getElementById("cpf");
    const nomeInput = document.getElementById("nome");
    cpfInput.value = '';

    if (tipoConta === "fisica") {
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


function aplicarMascaraTelefone(input) {
    $(input).on('input', function() {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        input.value = value.slice(0, 15);
    });
}

window.onload = function() {
    alterarFormulario();
    aplicarMascaraCPF(document.getElementById("cpf"));
    aplicarMascaraTelefone(document.getElementById("telefone"));
};