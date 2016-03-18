# rest_api assignment

This is my submission for the 401 rest_api assignment.

# Instructions for Use
1. Create a `.config.js` file in root. You can store your db uri and server ports here.

Example text:
```
module.exports = {
  DB: process.env.DB,
  PORT: Number(process.env.PORT)
}

```
2. Start the server with `node index.js`

3. Run tests with `mocha`
