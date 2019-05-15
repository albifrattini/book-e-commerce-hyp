module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookstore'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};