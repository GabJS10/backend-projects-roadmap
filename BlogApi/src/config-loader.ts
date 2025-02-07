export const configLoader = ()  => {
    return {
        PORT:process.env.PORT,
        mongo:
        {
            uri:process.env.MONGO_URI
        }
    }
}