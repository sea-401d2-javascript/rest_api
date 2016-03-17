# rest_api assignment

This is my submission for the 401 rest_api assignment.

# Instructions for Use
1. Create a `.config.js` file in root. You can store your db uri and server ports here.

*.config.js*
```
module.exports.DB_PORT = 'your mongodb uri';
module.exports.S_PORT = 3000;
```
2. I've written a node script to populate the database with randomly-generated entries. Just type `npm run addDocuments` once.
