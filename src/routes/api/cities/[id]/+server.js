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

export async function GET({ params }) {

    const { id } = params;

    const [rows] = await pool.query(
        'SELECT * FROM cities WHERE id = ?',
        [id]
    );

    if (rows.length === 0) {
        return Response.json(
            { message: 'City not found' },
            { status: 404 }
        );
    }

    return Response.json(rows[0], { status: 200 });
}

export async function PUT({ params, request }) {

    if (!checkAuth(request)) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    const { id } = params;

    const { name, location, type, population, height } = await request.json();

    if (!name || !location || !type) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    const [result] = await pool.query(
        `UPDATE cities SET name = ?, location = ?, type = ?, population = ?, height = ? WHERE id = ?`,
        [name, location, type, population, height, id]
    );

    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'City not found' },
            { status: 404 }
        );
    }

    return Response.json(
        { message: 'City updated successfully' },
        { status: 200 }
    );
}

export async function DELETE({ params, request }) {

    if (!checkAuth(request)) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    const { id } = params;

    const [result] = await pool.query(
        'DELETE FROM cities WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'City not found' },
            { status: 404 }
        );
    }

    return new Response(null, { status: 204 });
}