const CORS_CONFIG = {
  origin: (ctx) => {
    return 'http://localhost:5000';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}
module.exports = {
  CORS_CONFIG
}