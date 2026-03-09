// Arquivo: api/register.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Credenciais do Supabase não configuradas no ambiente.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(request, response) {

    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Método não permitido' });
    }

    try {

        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        if (password.length < 6) {
            return response.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        // 🔎 Tenta cadastrar o usuário
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        // Se houver erro real
        if (error) {
            return response.status(400).json({ error: error.message });
        }

        // 🔎 Aqui detectamos se o email já estava cadastrado
        if (!data.user || (data.user && data.user.identities && data.user.identities.length === 0)) {
            return response.status(400).json({
                error: "Este e-mail já está cadastrado. Tente fazer login."
            });
        }

        // Cadastro normal
        return response.status(201).json({
            message: 'Cadastro efetuado com sucesso! Verifique seu e-mail para confirmar a conta.',
            user: data.user
        });

    } catch (e) {

        return response.status(500).json({
            error: 'Erro interno do servidor.',
            details: e.message
        });

    }

}