## Books

curl -X GET -H 'Content-type: application/json' http://localhost:3000/books

curl -X POST -H 'Content-type: application/json' --data '{"title": "JavaScript: The Good Parts", "author": "Douglas Crockford", "price": 29.99, "quantity": 15, "isAvailable": true }' http://localhost:3000/books

curl -X GET -H 'Content-type: application/json' http://localhost:3000/books/56e993897883a5ab2f05a1ed

curl -X PUT -H 'Content-type: application/json' --data '{"quantity": 13}' http://localhost:3000/books/56e993897883a5ab2f05a1ed

curl -X DELETE -H 'Content-type: application/json' http://localhost:3000/books/56e99af6b944cc3a32832f03

curl -X GET -H 'Content-type: application/json' http://localhost:3000/books/totalQuantity


## Customers

curl -X GET -H 'Content-type: application/json' http://localhost:3000/customers

curl -X POST -H 'Content-type: application/json' --data '{"firstName": "Joe", "lastName": "Doe", "gender": "male", "emailAddress": "joedoe@gmail.com"}' http://localhost:3000/customers

curl -X GET -H 'Content-type: application/json' http://localhost:3000/customers/56e9a5efdb27c9ca3547a9fd

curl -X PUT -H 'Content-type: application/json' --data '{"lastName": "Doe Ray"}' http://localhost:3000/customers/56e9a5efdb27c9ca3547a9fd

curl -X DELETE -H 'Content-type: application/json' http://localhost:3000/customers/56e99b082bc8bf613257e0c4