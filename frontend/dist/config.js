// config.ts - Configuration for API base URL
export const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : 'https://igorl1.pythonanywhere.com';
