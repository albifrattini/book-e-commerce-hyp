module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/book-store'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};