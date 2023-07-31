# Zeit Shop

### Project Description

This is a full-stack project built with the MERN stack and TypeScript. Here's the list of the full tech stack:
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![image](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62Ee)
![image](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

### Features

-   Filter products by categories / price
-   Users can register and login
-   Users can add product to wishlist
-   Users can access their own private dashboard which contains their personal info, their reviews and their wishlist.
-   Integrated Stripe payment (test mode card number: 4242 4242 4242)

### How to setup locally

1. Clone this repo
2. Run **npm install** in both client and server folders
3. Set up your server **env** variables

```
MONGO_URI=YOUR-MONGO-URI
JWT_SECRET=RANDOM-STRING
STRIPE_TEST_KEY=YOUR-STRIPE-TEST-KEY
PORT=YOUR-PORT
CLIENT_URL=YOUR-CLIENT-URL
```

**NOTE**: The **Mongo URI** should look like this: mongodb+srv://user:pass@cluster/Products?retryWrites=true&w=majority

4. Run the **populateDB()** function for populating the MongoDB with products:

-   Go to ./server/server.ts
-   **Uncomment** line 31 ` // populateDB()`
-   Run **npm run dev** in your server folder
-   If successfull, **comment line 31 again**

5. Run **npm run dev** in both server and client folders

### This is an ongoing project.

##### There are still some features which are either missing or incomplete:

-   Reviews system.
-   Admin dashboard to add, remove or edit products.
-   Implement order history in user dashboard.
