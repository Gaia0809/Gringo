const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  },
  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.status === 204 ? null : res.json()
  },
  put: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.status === 204 ? null : res.json()
  },
  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return null
  },
}

export default api
