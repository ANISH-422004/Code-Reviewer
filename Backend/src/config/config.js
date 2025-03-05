const _config = {
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    

}

const config = Object.freeze(_config)

module.exports = config