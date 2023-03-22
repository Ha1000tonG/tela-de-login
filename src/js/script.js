function mostrarSenha() {

    var imputPass = document.getElementById('senha')
    var btnMostrarSenha = document.getElementById('btn-senha')

    if (imputPass.Type === 'password') {
        imputPass.setAttribute('type', 'text')
        btnMostrarSenha.classList.replace('bi-lock', 'bi-unlock')
    } else {
        imputPass.setAttribute('type', 'password')
        btnMostrarSenha.classList.replace('bi-unlock', 'bi-lock')
    }
}
// function logar() {
//     var email = document.getElementById('email').value;
//     var senha = document.getElementById('senha').value;

//     if (email == "hamiltongodoi@hotmail.com" && senha == "123456") {
//         // alert('Login Efetuado com Sucesso');
//         location.href = "home.html";

//     } else {
//         alert('usuario ou Senha incorretos!');
//     }
// }





