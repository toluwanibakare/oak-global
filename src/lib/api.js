const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function submitContact(data) {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || 'Failed to submit')
  return result
}
