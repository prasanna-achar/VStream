# VStream

**VStream** is a modern, scalable video streaming platform built with a microservices architecture. It features a high-performance React frontend and a robust Spring Boot backend ecosystem, designed to deliver a seamless video viewing and uploading experience.

## 🚀 Architecture Overview

VStream follows a microservices pattern to ensure scalability and separation of concerns:

*   **Frontend**: A Single Page Application (SPA) built with React 19 and Vite.
*   **API Gateway**: The entry point for all client requests, routing them to the appropriate microservices.
*   **Microservices**:
    *   **Users Service**: Handles authentication, authorization, and user account management.
    *   **Profile Service**: Manages user profiles and settings.
    *   **Upload Service**: Handles video uploads and processing.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite 7](https://vitejs.dev/)
*   **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Video Player**: [Video.js](https://videojs.com/) & [hls.js](https://github.com/video-dev/hls.js)
*   **HTTP Client**: Axios

### Backend
*   **Language**: Java 21
*   **Framework**: Spring Boot 3.5.7
*   **Gateway**: Spring Cloud Gateway (WebFlux)
*   **Database**: PostgreSQL
*   **Security**: Spring Security, JWT (JSON Web Tokens), Bcrypt
*   **Build Tool**: Maven

## 📂 Project Structure

```
VStream/
├── ApiGateway/          # Spring Cloud Gateway service
├── Frontend/            # React client application
├── users/               # User authentication & management service
├── profile/             # User profile service
├── upload/              # Video upload service
└── ...
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   Java JDK 21
*   Maven
*   PostgreSQL

### Installation & Running

#### 1. Backend Services
Each microservice is a standard Maven project. You need to start them individually (or configure a docker-compose setup).

**ApiGateway:**
```bash
cd ApiGateway
./mvnw spring-boot:run
```

**Users Service:**
```bash
cd users
./mvnw spring-boot:run
```
*(Repeat for `profile` and `upload` services)*

#### 2. Frontend Application
```bash
cd Frontend
npm install
npm run dev
```
The frontend will typically be available at `http://localhost:5173`.

## 🔐 Environment Configuration

Ensure you have the necessary `.env` files or environment variables set up for:
*   Database connection strings (PostgreSQL)
*   JWT Secrets
*   Service URLs (if not using a discovery server)

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
