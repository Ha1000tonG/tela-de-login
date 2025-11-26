document.addEventListener('DOMContentLoaded', () => {
    const emailSalvo = localStorage.getItem('email');
    if (emailSalvo) {
        const emailInput = document.getElementById('email');
        emailInput.value = emailSalvo;
        document.getElementById('lembrar-me').checked = true;
        // Garante que o label flutue se o e-mail for preenchido
        if (emailInput.value) {
            emailInput.classList.add('has-value');
        }
    }
});

document.querySelectorAll('.input').forEach(input => {
    // Garante que o estado inicial esteja correto no carregamento da página (caso o navegador preencha automaticamente)
    if (input.value) {
        input.classList.add('has-value');
    }

    input.addEventListener('input', () => {
        // Adiciona a classe se houver valor, remove se estiver vazio
        input.classList.toggle('has-value', input.value.length > 0);
    });
});

const inputPass = document.getElementById('senha');
const btnMostrarSenha = document.getElementById('btn-senha');

btnMostrarSenha.onclick = () => {
    if (inputPass.type === 'password') {
        inputPass.type = 'text';
        btnMostrarSenha.classList.add('bi-unlock');
    } else {
        inputPass.type = 'password';
        btnMostrarSenha.classList.remove('bi-unlock')
    }
}

async function logar() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const lembrarMeCheckbox = document.getElementById('lembrar-me');
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Salva ou remove o e-mail do localStorage conforme a opção "Lembrar-me"
    if (lembrarMeCheckbox.checked) {
        localStorage.setItem('email', email);
    } else {
        localStorage.removeItem('email');
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return; // Interrompe a função se o e-mail for inválido
    }

    // Envia os dados para a nossa API de back-end
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: senha }),
        });

        const result = await response.json();

        if (!response.ok) {
            // Se a resposta não for OK (ex: 401 Unauthorized), usa a mensagem de erro da API
            alert(`Falha no login: ${result.error}`);
        } else {
            // Se o login for bem-sucedido, redireciona para a home
            location.href = 'home.html';
        }
    } catch (error) {
        console.error('Falha ao conectar com a API:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
}
