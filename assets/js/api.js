const api = {
    async buscarUsuarios() {
        try {
            const response = await fetch('http://localhost:3000/users')
            return await response.json()
        } catch {
            alert('Erro ao buscar')
            throw error
        }
    }
}