import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context,next) => {
    
    const basicAuth = context.request.headers.get("Authorization");

    if (!basicAuth) {
        return new Response("Autenticación requerida", {
            status: 401,
            headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
        });
    }

    const [username, password] = atob(basicAuth?.split(" ")[1] || "").split(":");

    context.locals.isAdmin = username === "admin" && password === "admin" ? true : false;


    return next();
 

})