// Função global para ser chamada pelo botão no HTML
window.redefinirSenha = async function () {
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-nova-senha').value;

    // Validações básicas no front-end
    if (novaSenha.length < 6) return alert('A nova senha deve ter no mínimo 6 caracteres.');
    if (novaSenha !== confirmarSenha) return alert('As senhas não coincidem.');

    // Pega o token de acesso da URL.
    // Ex: http://.../resetar-senha.html#access_token=SEU_TOKEN&...
    const fragment = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = fragment.get('access_token');

    if (!accessToken) {
        return alert('Token de acesso não encontrado. O link pode ser inválido ou ter expirado.');
    }

    try {
        const response = await fetch('/api/resetar-senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: accessToken,
                newPassword: novaSenha,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            alert(`Erro ao redefinir a senha: ${result.error}`);
        } else {
            alert('Senha redefinida com sucesso! Você será redirecionado para a tela de login.');
            window.location.href = "index.html";
        }
    } catch (error) {
        console.error('Falha ao conectar com a API:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
};

// Lógica de UI (efeitos de label, visibilidade da senha, etc.)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.toggle('has-value', input.value.length > 0);
        });
    });

    const togglePasswordVisibility = (inputId, buttonId) => {
        const inputPass = document.getElementById(inputId);
        const btnMostrarSenha = document.getElementById(buttonId);
        const isPassword = inputPass.type === 'password';
        inputPass.type = isPassword ? 'text' : 'password';
        btnMostrarSenha.classList.toggle('bi-lock', !isPassword);
        btnMostrarSenha.classList.toggle('bi-unlock', isPassword);
    };

    document.getElementById('btn-nova-senha').onclick = () => togglePasswordVisibility('nova-senha', 'btn-nova-senha');
    document.getElementById('btn-confirmar-nova-senha').onclick = () => togglePasswordVisibility('confirmar-nova-senha', 'btn-confirmar-nova-senha');
});

