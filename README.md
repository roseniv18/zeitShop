# zeitShop

## _A fully functional MERN project_

This project was built primarily for the purpose of practicing my React skills, as well as learning some new backend skills. This is **not** a tutorial project. In short, here's what it has to offer:

-   Responsive design.
-   Products page with filtering capabilities.
-   Search bar.
-   Cart.
-   User register and login.
-   A user dashboard where the user can manage their personal info, reviews and wishlist.
-   Order page using Stripe API.

## Tech Stack used:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## How to (fake) order a product:

1. Select one or multiple products and add them to your cart.
2. Click on the cart icon -> see cart.
3. Click proceed to checkout.
4. Enter some arbitrary data.
5. Click order.
6. Again, enter some arbitrary data. For the card number use 4242 4242 4242 4242 and some random CVC and expiry date.
7. Click pay.

## How to install with Docker:

1. Pull this repo to your machine:

```
cd yourWorkingDir
git init
git pull https://github.com/roseniv18/zeitShop.git
```

2. Change the following env variables in compose.yaml file. You should have setup a Mongo database and Stripe Test mode (https://docs.stripe.com/keys):

```
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_JWT_SECRET
STRIPE_TEST_KEY=YOUR_STRIPE_TEST_KEY
```

3. Run `docker compose up` or `sudo docker compose up`.
4. Done!

## How to install this project locally:

1. Pull this repo and install dependencies:

```
cd yourWorkingDir
git init
git pull https://github.com/roseniv18/zeitShop.git
cd ./server
npm i
cd ../client
npm i
```

2. Create `./server/.env` file:

```
NODE_ENV=development
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_JWT_SECRET
STRIPE_TEST_KEY=YOUR_STRIPE_TEST_KEY
CLIENT_URL=http://localhost:5173/
SERVER_URL=http://localhost:5000/
PORT=5000
```

An explanation for some of the fields:

-   JWT_SECRET is an arbitrary string of characters, used for signing and issuing JSON Web Tokens. Read more: https://jwt.io/introduction
-   STRIPE_TEST_KEY is a test key that is required by the Stripe API (in test mode). Read more: https://docs.stripe.com/keys

3. Create `./client/.env` file:

```
VITE_NODE_ENV=development
```

4. In the `./server/server.ts` file, uncomment line 39 (_populateDB()_). This is only necessary on the first run of the project. You can comment it again after that.
5. Start the server and the client (using yarn or npm).
