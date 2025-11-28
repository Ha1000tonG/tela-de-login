// api/resetar-senha.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Usamos a Service Role Key aqui para ter privilégios

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Erro no servidor: As credenciais do Supabase não foram encontradas.");
}

// Inicializa o Supabase com a chave de serviço para operações de admin
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Método não permitido' });
    }

    const { accessToken, newPassword } = request.body;

    if (!accessToken || !newPassword) {
        return response.status(400).json({ error: 'Token de acesso e nova senha são obrigatórios.' });
    }

    // 1. Usa o token de acesso para obter a sessão do usuário
    const { data: { user }, error: sessionError } = await supabase.auth.getUser(accessToken);

    if (sessionError || !user) {
        return response.status(401).json({ error: 'Token de acesso inválido ou expirado.' });
    }

    // 2. Com o usuário autenticado, atualiza a senha dele
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, { password: newPassword });

    if (updateError) {
        return response.status(500).json({ error: `Erro ao atualizar a senha: ${updateError.message}` });
    }

    return response.status(200).json({ message: 'Senha redefinida com sucesso!' });
}

