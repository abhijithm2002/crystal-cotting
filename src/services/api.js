const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').trim().replace(/\/+$/, '').replace(/\/api$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(60000),
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const message = payload?.message || `Request failed (${response.status})`
    throw new Error(message)
  }

  if (!payload || payload.success !== true) throw new Error('Invalid API response. Check VITE_API_BASE_URL.');
  return payload
}

export function apiGet(path, params) {
  const entries = Object.entries(params || {}).filter(
    ([, value]) => value !== undefined && value !== null && value !== '',
  )
  const query = entries.length ? `?${new URLSearchParams(entries).toString()}` : ''
  return request(`${path}${query}`)
}

export function apiPost(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) })
}

/**
 * Uploaded media (images) are stored on the backend and referenced by relative
 * paths like "/uploads/xyz.jpg". This resolves them to an absolute URL so the
 * website can load them regardless of which host it's served from.
 */
export function resolveMediaUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export { API_BASE_URL }
