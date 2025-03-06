#  Todo Application Backend

## Description
This is the backend for a **Todo App** built with **NestJS**, a progressive **Node.js framework** for building efficient and scalable server-side applications. The backend provides RESTful APIs to create users, login, manage tasks, including creating, reading, updating, and deleting tasks.

## Backend Setup

To run the backend application, follow the steps below:

1. **Install Dependencies**:
   Install all necessary dependencies using npm:

```bash
  npm install
```

2. **Run Docker**:
   Initialize and run docker to run postgres DB:

```bash
  docker-compose up -d   
```

3. **Run the backend app**:

```bash
  npm run start:dev
```

## ***Features:***

* **App Backend**
1)  Create a backend to do application using ***Node.js***, ***TypeScript*** , ***PostgreSQL database*** and ***Docker***.
2)  The PostgreSQL database is hosted inside a Docker container for an isolated, portable, and consistent environment.
2)  Ensure that the web application communicates effectively with the chosen frontend technology (React.js).

* **User Authentication**
1) Secure backend user signup and login functionality with ***JWT***.
2) Add ***JWT*** authentication/authorization for access to REST API Endpoints (CRUD).


* **Backend API Endpoints:**
1) Sign up user: http://localhost:3001/auth/signup
2) Log in User: http://localhost:3001/auth/login
3) Add User Task: http://localhost:3001/tasks
4) EDIT/PATCH/UPDATE User Task: http://localhost:3000/tasks/:id 
5) DELETE User Tasks: http://localhost:3000/tasks/:id


* **ToDo Management**
1) Task Creation: Users can add tasks with titles, descriptions, and deadlines.
2) Task Management: Tasks can be updated, edited, and deleted.
3) Task Completion: Tasks can be marked as completed (with checkboxes).
4) Task Integrity:Ensure that expenses are associated with the logged-in user.
5) Due Dates: Users can set deadlines for tasks.

## Technologies Used

- **NestJS**: A powerful framework for building server-side applications with Node.js.
- **TypeORM**: Object-Relational Mapping (ORM) for interacting with the database.
- **PostgreSQL**: Relational database to store user and task information.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Bcrypt.js**: To hash passwords securely.


### ***Env:***
```bash
# Port No
DB_PORT=5432

# Postgres DB Host
DB_HOST=

# Postgres DB User
DB_USER=

# Postgres DB Name
DB_NAME=

# Postgres DB Password
DB_PASSWORD=

# JWT SECRET
JWT_SECRET=

```