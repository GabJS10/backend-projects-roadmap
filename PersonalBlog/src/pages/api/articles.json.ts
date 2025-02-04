import type { APIRoute } from 'astro';
import { db, Articles, eq } from 'astro:db';

export const GET: APIRoute = async () => {
    const data = await db.select().from(Articles)
    return new Response(
        JSON.stringify(data),
        { status: 200 }
    )
}


export const POST: APIRoute = async ({ request }) => {
    try {
        const { title, content } = await request.json();

    const now = new Date();



    const publishing_date = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).replace(/^\w/, (c) => c.toUpperCase());

    const data = await db.insert(Articles).values({ title, content, publishing_date })
    return new Response(
        JSON.stringify(data),
        { status: 200 }
    )
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error }),
            { status: 400 }
        )
    }
}


export const PATCH: APIRoute = async ({ params, request }) => {
    
    try {
        const { id } = params;
        const {title,content} = await request.json();
        await db.update(Articles).set({title,content}).where(eq(Articles.id,parseInt(id?.toString() || "")))
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ error }),
            { status: 400 }
        )
    }

    return new Response(
        JSON.stringify({ message: "success" }),
        { status: 200 }
    )
}