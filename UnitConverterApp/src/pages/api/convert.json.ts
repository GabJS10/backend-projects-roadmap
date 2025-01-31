import type { APIRoute } from 'astro';
import { convert } from '../../utils/action';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json()
    const { value, type, from, to } = data
    
    try {
        const result = convert(parseFloat(value.toString()), type, from, to)
        
        return new Response(JSON.stringify({ result: parseFloat(result.toFixed(2)) }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 400 })
    }

}