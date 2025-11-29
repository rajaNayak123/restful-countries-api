import { URL } from 'url';
import { sendJSON } from '../utils/response.js';
import { getCountries } from '../controllers/countryController.js';

const router = async (req, res) => {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseURL = `${protocol}://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    const pathname = parsedUrl.pathname;
    const urlParams = parsedUrl.searchParams;

    if (req.method === 'GET') {
        if (pathname === '/health') {
            return sendJSON(res, 200, { status: 'OK', uptime: process.uptime() });
        }
        
        if (pathname === '/api/countries') {
            return await getCountries(req, res, urlParams);
        }
    }

    // 404 Handler
    sendJSON(res, 404, { error: 'Endpoint not found' });
};

export { router };