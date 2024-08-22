const api = {
    async buscarUsuarios() {
        try {
            const response = await fetch('http://localhost:3000/users');
            return await response.json();
        } catch (error) {
            alert('Erro ao buscar usuários');
            throw error;
        }
    },

    async criarUsuario(usuario) {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }
            
            return await response.json();
        } catch (error) {
            alert('Erro ao criar usuário');
            throw error;
        }
    },

    async atualizarUsuario(id, usuario) {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }
            
            return await response.json();
        } catch (error) {
            alert('Erro ao atualizar usuário');
            throw error;
        }
    },

    async deletarUsuario(id) {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar usuário');
            }
        } catch (error) {
            alert('Erro ao deletar usuário');
            throw error;
        }
    }
};
