import pool from '$lib/server/database.js';
import { API_USER, API_PASSWORD } from '$env/static/private';

function checkAuth(request) {
    const auth = request.headers.get('Authorization');

    if (!auth?.startsWith('Basic ')) {
        return false;
    }

    const base64 = auth.slice(6);
    const decoded = atob(base64);

    const [user, pass] = decoded.split(':');

    return user === API_USER && pass === API_PASSWORD;
}

export async function GET() {

    const [rows] = await pool.query('SELECT * FROM cities');

    return Response.json(rows, { status: 200 });
}

export async function POST({ request }) {

    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, location, type, population, height } = await request.json();

    if (!name || !location || !type) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
        'INSERT INTO cities (name, location, type, population, height) VALUES (?, ?, ?, ?, ?)',
        [name, location, type, population, height]
    );

    return Response.json(
        { message: 'City created', id: result.insertId },
        { status: 201 }
    );
}