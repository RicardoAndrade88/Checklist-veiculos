// script.js

// Selecionando o formulário
const form = document.getElementById('formContato');

// Função para validar o formulário
form.addEventListener('submit', function(event) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação simples
    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();  // Impede o envio do formulário se algum campo estiver vazio
    } else {
        alert("Mensagem enviada com sucesso!");
    }
});

// script.js

form.addEventListener('submit', function(event) {
    let valid = true;

    if (!nomeInput.value) {
        nomeInput.classList.add('erro');
        valid = false;
    } else {
        nomeInput.classList.remove('erro');
    }

    if (!emailInput.value) {
        emailInput.classList.add('erro');
        valid = false;
    } else {
        emailInput.classList.remove('erro');
    }

    if (!mensagemInput.value) {
        mensagemInput.classList.add('erro');
        valid = false;
    } else {
        mensagemInput.classList.remove('erro');
    }

    if (!valid) {
        alert("Por favor, preencha todos os campos corretamente.");
        event.preventDefault(); // Impede o envio
    } else {
        alert("Mensagem enviada com sucesso!");
    }
});

// script.js

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
