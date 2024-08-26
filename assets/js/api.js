const api = {
    async buscarUsuarios() {
        try {
            const response = await axios.get('http://localhost:3000/users');
            return response.data;  
        } catch (error) {
            alert('Erro ao buscar usuários');
            throw error;
        }
    },

    async criarUsuario(usuario) {
        try {
            const response = await axios.post('http://localhost:3000/users', usuario); 
            return response.data;
        } catch (error) {
            alert('Erro ao criar usuário');
            throw error;
        }
    },

    async atualizarUsuario(id, usuario) {
        try {
            const response = await axios.put(`http://localhost:3000/users/${id}`, usuario); 
            return response.data;
        } catch (error) {
            alert('Erro ao atualizar usuário');
            throw error;
        }
    },

    async deletarUsuario(id) {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
        } catch (error) {
            alert('Erro ao deletar usuário');
            throw error;
        }
    }
};
