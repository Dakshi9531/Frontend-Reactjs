const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

async function request(path, { method = 'GET', body, signal } = {}) {
if (!BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL. Add it to the project root .env file, for example: VITE_API_BASE_URL=http://localhost:5000');
}

const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const response = await fetch(url, {
    method,
    headers: {
    'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined,
    signal
});

if (!response.ok) {
    throw new Error(`Failed: ${response.status}`);
}

if (response.status === 204) {
    return null;
}

const contentType = response.headers.get('content-type') || '';

if (!contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON from the API, but received ${contentType || 'an unknown response type'} instead. Check that the backend is running and VITE_API_BASE_URL is correct. Response started with: ${text.slice(0, 120)}`);
}

return response.json();
}

export const api = {
get: (path, options = {}) =>
    request(path, {
    ...options,
    method: 'GET'
    }),

post: (path, body, options = {}) =>
    request(path, {
    ...options,
    method: 'POST',
    body
    }),

put: (path, body, options = {}) =>
    request(path, {
    ...options,
    method: 'PUT',
    body
    }),

delete: (path, options = {}) =>
    request(path, {
    ...options,
    method: 'DELETE'
    })
};