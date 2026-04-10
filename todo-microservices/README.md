🧩 Todo Microservices Architecture (Node.js + MongoDB)

A scalable, production-ready Todo Application built using Microservices Architecture with Node.js and MySQL. Each service is independently deployable and communicates via an API Gateway.


🚀 Overview

This project demonstrates how to design a distributed backend system using microservices instead of a monolithic architecture.

The system is divided into 4 independent services:

👤 User Service → Handles user management & authentication & JWT
🔐 Reminder Service → sends notifiactons to user
📝 Task Service → Manages tasks
🌐 API Gateway → Central request routing

🏗️ Architecture Diagram

Client (Frontend / Postman)
            │
            ▼
        API Gateway
    ┌──────┼──────┐
    ▼      ▼      ▼
    User   Task Service
    │      │        │
  MongoDB  MongoDB  MongoDB

⚙️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (separate DB per service)
Authentication: JWT
Password Security: bcrypt
API Gateway: http-proxy-middleware
Environment Config: dotenv

📦 Microservices Breakdown

📝 Reminder Service
sends reminder to user
Token Validation

📁 Path:
    /todo-microservices/auth-service


👤 User Service
User Registration
User Login
JWT Token Generation
Token Validation
User CRUD Operations
Stores user data

📁 Path:
    /todo-microservices/user-service

📝 Task Service
Create Todo
Update Todo
Delete Todo
Fetch user-specific todos

📁 Path:
    /todo-microservices/todo-service

🌐 API Gateway
Single entry point for all requests
Routes requests to appropriate services
Handles service communication

📁 Path:
    /todo-microservices/api-gateway

🔐 Key Features
✅ Microservices architecture
✅ Independent services with separate databases
✅ JWT-based authentication
✅ Scalable backend design
✅ Clean modular structure
✅ MySQL relational data handling

📁 Project Structure
todo-microservices/
│
├── api-gateway/
├── reminder-service/
├── user-service/
├── task-service/
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/Sujalshaw05/backend-projects.git
cd todo-microservices

2️⃣ Install Dependencies
    cd auth-service && npm install
cd ../user-service && npm install
cd ../todo-service && npm install
cd ../api-gateway && npm install

3️⃣ Configure Environment Variables

Create .env file in each service:

📝 Reminder Service
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

👤 User Service
PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📝 Todo Service
PORT=5003
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🌐 API Gateway
PORT=5000

🗄️ Database Design (MongoDB)

Each service has its own database:

auth_db → authentication data
user_db → user details
todo_db → tasks

This follows the Database per Service pattern, ensuring loose coupling.

🔗 API Flow
Client sends request → API Gateway
Gateway forwards request → respective service
Service interacts with MongoDB database
Response returned via Gateway

🔑 Authentication Flow
User logs in via Auth Service
JWT token is generated
Token sent in headers for protected routes
Services validate token before processing

🧪 Example APIs
Auth
POST /api/auth/login
Users
POST /api/users
GET /api/users
Todos
POST /api/todos
GET /api/todos
PUT /api/todos/:id
DELETE /api/todos/:id

🐳 Future Improvements
Docker & Docker Compose
Kubernetes deployment
Message Queue (Kafka / RabbitMQ)
Centralized logging
Rate limiting & security enhancements
CI/CD pipeline

📈 Why This Project Matters

This project demonstrates:

Real-world backend architecture
System design understanding
Scalable application development
Service communication patterns

🤝 Contributing

Feel free to fork and improve!

📜 License

MIT License

👨‍💻 Author

Sujal Shaw
🔗 GitHub: https://github.com/Sujalshaw05