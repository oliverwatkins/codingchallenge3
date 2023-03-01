

`run "start-backend"`

in backend/package.json

`run "start-frontend"`

in frontend/package.json




GraphQL queries can be made by accessing :

http://localhost:3000/graphql

An example query: 

`{
orders {state, id, customer, items {description, amount}, statusChanges {status,updatedDate}}
}`

DB is initially populated in the **onModuleInit** method in order.service.ts. This method doesnt delete the DB data first, so
after multiple restarts of the server the database data will become duplicated. Delete the file 'memory' if this becomes 
annoying and to reset the database.


