import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});


export const register = async (body) => {
    let data = {}
    try {
        const response = await api.post('/usuario', body)

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        console.log(erro);
        data = {
            message: erro.response.data,
            error: true
        }
    }
    return data
}

export const login = async (body) => {
    let data = {}
    try {
        const response = await api.post('/login', body)
        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const adicionarTransacao = async (body, token) => {
    let data = {}
    try {
        const response = await api.post('/transacao', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const editarTransacao = async (body, token, id) => {
    let data = {}

    try {
        const response = await api.put(`/transacao/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const excluirTransacao = async (token, id) => {
    let data = {}

    try {
        const response = await api.delete(`/transacao/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const editarPerfil = async (body, token) => {
    let data = {}

    try {
        const response = await api.put('/usuario/', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }
    return data
}

export const transacoesUsuario = async (token) => {
    let data = {}
    try {
        const response = await api.get('/transacao', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }

    return data
}

export const categoriasProdutos = async (token) => {
    let data = {}
    try {
        const response = await api.get('/categoria', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }

    return data
}

export const extratoUsuario = async (token) => {
    let data = {}
    try {
        const response = await api.get('/transacao/extrato', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        data = {
            message: response.data,
            error: false
        }

    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }

    return data
}
export const filtroTransacoes = async (token, requisicao) => {
    let data = {}
    try {
        const response = await api.get(`/transacao?filtro[]=${requisicao}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        data = {
            message: response.data,
            error: false
        }
    } catch (erro) {
        data = {
            message: erro.response.data.mensagem,
            error: true
        }
    }

    return data
}