
https://www.youtube.com/watch?v=geYvdbpo3cA&lc=UgwOMoR6_4BKOKv0TTt4AaABAg.9mUrr5pLmE_9mUx5kzCP9A


run "start-server"

then open :

http://localhost:3000/graphql


check employees with orders : 

`{
    employees {id, name, orders {state}}
}`

or

`{
    orders {id, state, employeeNo}
}`




