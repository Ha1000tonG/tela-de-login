// src/js/esqueci-senha.js

document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.toggle('has-value', input.value.length > 0);
    });
});

async function solicitarReset() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    if (!email) {
        alert('Por favor, digite seu endereço de e-mail.');
        return;
    }

    try {
        const response = await fetch('/api/esqueci-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (!response.ok) {
            alert(`Erro: ${result.error}`);
        } else {
            alert("Se o e-mail estiver cadastrado em nosso sistema, um link de recuperação de senha foi enviado. Por favor, verifique sua caixa de entrada.");
            // Opcional: desabilitar o botão para evitar múltiplos cliques
            document.querySelector('button').disabled = true;
        }
    } catch (error) {
        console.error('Falha ao conectar com a API:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
}
