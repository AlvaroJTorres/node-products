# README

# node-products

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 18.18.0


# Getting started
- Clone the repository

- Install dependencies
```
cd node-products
npm install
```
- This project has seeds from an excel file located in the public folder. To run the seed use
```
npx sequelize-cli db:seed:all
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8080` or the defined port if changed

## Endpoints
- For user registration and authentication
```
Method POST '/api/sign-up'   -> Register an user and get access token
Method POST '/api/sign-in'   -> Login an user and get access token
Method POST '/api/sign-out'  -> Log out 
Method PATCH '/api/change-password'   -> Modify user password
```

- For products
```
Method GET '/api/products' + Authorization: Bearer token -> Get product list
Method GET '/api/products/:id' + Authorization: Bearer token -> Get a single product
Method POST '/api/products' + body + Authorization: Bearer token -> Add a product
Method PATCH '/api/products/:id' + body + Authorization: Bearer token -> Update product data
Method DELETE '/api/products/:id' + Authorization: Bearer token -> Delete a product
```