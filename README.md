# AC-2-3-A7 Restaurant-List

Restaurant list created using node.js, mongodb and framework express.

![image](./public//pic/home.jpg)

## Features

- List all restaurants.
- Show restaurant detail.
- Search restaurant by name or category.
- New a restaurant,
- Edit a restaurant information.
- Delete a restaurant.

## How to use

1. Clone the Repo to local server.
```bash
    git clone https://github.com/paulwu-tw/restaurants.git
```

2. Install need package by follow cmd.
```bash
    npm install
```

3. Touch a .env file, and config MongoDB connect info below.
```bash
    MONGODB_URI=<Your own connection string>
    MONGODB_USER=<Username>
    MONGODB_PASSWORD=<Password>
```

4. Create test data
```bash
    npm run seed
```

5. Start server for demo.
```bash
    npm run dev
```

6. While see the message below, open browser and enter the following URL. 
```bash
    Listen on http://localhost:3000
```

7. Stop server
```bash
    cmd + c
```

## Built with

- Node.js: 18.15.0
- MongoDB Altas
- Express: 4.18.2
- Express-handlebars: 7.0.7
- mongoose: 7.1.0
- dotenv: 16.0.3