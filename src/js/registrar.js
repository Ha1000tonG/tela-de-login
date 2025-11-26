// Verifica se a página foi carregada por um recarregamento (refresh) e redireciona para o login
if (
    window.performance &&
    performance.navigation.type === performance.navigation.TYPE_RELOAD
) {
    window.location.href = 'index.html';
}

document.querySelectorAll('.input').forEach(input => {
    // Garante que o estado inicial esteja correto no carregamento da página
    if (input.value) {
        input.classList.add('has-value');
    }

    input.addEventListener('input', () => {
        // Adiciona a classe se houver valor, remove se estiver vazio
        input.classList.toggle('has-value', input.value.length > 0);
    });
});

// Função para alternar a visibilidade da senha
function togglePasswordVisibility(inputId, buttonId) {
    const inputPass = document.getElementById(inputId);
    const btnMostrarSenha = document.getElementById(buttonId);

    if (inputPass.type === 'password') {
        inputPass.type = 'text';
        btnMostrarSenha.classList.remove('bi-lock');
        btnMostrarSenha.classList.add('bi-unlock');
    } else {
        inputPass.type = 'password';
        btnMostrarSenha.classList.remove('bi-unlock');
        btnMostrarSenha.classList.add('bi-lock');
    }
}

document.getElementById('btn-senha').onclick = () => togglePasswordVisibility('senha', 'btn-senha');
document.getElementById('btn-confirmar-senha').onclick = () => togglePasswordVisibility('confirmar-senha', 'btn-confirmar-senha');


async function registrar() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');

    const email = emailInput.value;
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validações que continuam no front-end para feedback rápido ao usuário
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // Envia os dados para a nossa API de back-end
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            // Se a resposta não for OK, usa a mensagem de erro da API
            alert(`Erro no cadastro: ${result.error}`);
        } else {
            // Se a resposta for OK, usa a mensagem de sucesso da API
            alert(result.message);
            // Redireciona para o login após o sucesso
            location.href = 'index.html';
        }
    } catch (error) {
        console.error('Falha ao conectar com a API:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
}