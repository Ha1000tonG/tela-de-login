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