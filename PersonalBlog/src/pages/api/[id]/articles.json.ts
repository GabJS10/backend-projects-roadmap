import type { APIRoute } from 'astro';
import { db, Articles, eq } from 'astro:db';

export const PATCH: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        const { title, content } = await request.json();
        const data = await db.update(Articles).set({ title, content }).where(eq(Articles.id, parseInt(id?.toString() || "")))
      
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


export const GET: APIRoute = async ({ params }) => {
    try {
        const { id } = params;
        const data = await db.select().from(Articles).where(eq(Articles.id, parseInt(id?.toString() || "")))
        return new Response(
            JSON.stringify(data),
            { status: 200 }
        )
    } catch (error) {
        console.log();
        return new Response(
            JSON.stringify({ error }),
            { status: 400 }
        )
    }
}

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const { id } = params;
        await db.delete(Articles).where(eq(Articles.id, parseInt(id?.toString() || "")))
        return new Response(
            JSON.stringify({ message: "success" }),
            { status: 200 }
        )
    } catch (error) {
        console.log();
        return new Response(
            JSON.stringify({ error }),
            { status: 400 }
        )
    }
}