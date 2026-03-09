// api/esqueci-senha.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Corrigido para usar a chave ANON, que é a correta para esta função.

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Erro no servidor: As credenciais do Supabase não foram encontradas.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Método não permitido' });
    }

    const { email } = request.body;

    if (!email) {
        return response.status(400).json({ error: 'O e-mail é obrigatório.' });
    }

    // A URL para onde o usuário será redirecionado após clicar no link do e-mail.
    // Precisaremos criar a página 'resetar-senha.html' no próximo passo.
    const redirectUrl = `${request.headers.origin}/resetar-senha.html`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return response.status(400).json({ error: 'Email inválido.' });
    }

    if (error) {
        console.error('Erro ao solicitar reset de senha:', error);

        // ainda retornamos sucesso por segurança
        return response.status(200).json({
            message: 'Se o e-mail existir, um link foi enviado.'
        });
    }

    // Por segurança, sempre retornamos uma mensagem de sucesso,
    // mesmo que o e-mail não exista, para evitar que descubram e-mails cadastrados.
    return response.status(200).json({ message: 'Se o e-mail existir, um link foi enviado.' });
}
