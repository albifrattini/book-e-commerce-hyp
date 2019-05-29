module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookstore'
  },
  production: {
  	debug: true,
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true
  }
};