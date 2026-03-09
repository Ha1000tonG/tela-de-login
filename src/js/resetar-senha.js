import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
    "https://bcigiymerelioipvmyrh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjaWdpeW1lcmVsaW9pcHZteXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTU3NzcsImV4cCI6MjA3OTY5MTc3N30.Whgu1tSTVhTbpAk5cd6wV3gxInr53JrRRqbksnllLZg"
)

window.redefinirSenha = async function () {

    const novaSenha = document.getElementById('nova-senha').value
    const confirmarSenha = document.getElementById('confirmar-nova-senha').value

    if (!novaSenha || !confirmarSenha) {
        alert("Preencha todos os campos")
        return
    }

    if (novaSenha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres")
        return
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem")
        return
    }

    const { error } = await supabase.auth.updateUser({
        password: novaSenha
    })

    if (error) {

        alert("Erro ao redefinir senha: " + error.message)

    } else {

        alert("Senha redefinida com sucesso!")
        window.location.href = "index.html"

    }

}