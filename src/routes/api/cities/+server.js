import pool from '$lib/server/database.js';


export async function GET() {

    const [rows] = await pool.query('SELECT * FROM cities');

    return Response.json(rows, { status: 200 });
}