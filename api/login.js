import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Erro no servidor: As credenciais do Supabase não foram encontradas.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(request, response) {

    if (request.method !== "POST") {
        return response.status(405).json({
            error: "Método não permitido"
        });
    }

    try {

        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                error: "Email e senha são obrigatórios."
            });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return response.status(401).json({
                error: "Email ou senha inválidos."
            });
        }

        return response.status(200).json({
            message: "Login efetuado com sucesso!",
            user: data.user,
            session: data.session
        });

    } catch (e) {

        return response.status(500).json({
            error: "Erro interno do servidor.",
            details: e.message
        });

    }

}