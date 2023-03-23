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

function logar() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    if (email == "hamiltongodoi@hotmail.com" && senha == "123456") {
        // alert('Login Efetuado com Sucesso');
        location.href = "home.html";

    } else {
        alert('usuario ou Senha incorretos!');
    }
}




