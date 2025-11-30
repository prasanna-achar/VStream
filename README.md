# VStream

**VStream** is a modern, scalable video streaming platform designed to deliver a seamless viewing and uploading experience. Built with performance and scalability in mind, it leverages a microservices architecture to handle various aspects of video management, user authentication, and profile customization efficiently.

## 🏗️ How It's Built

VStream is built using a robust technology stack that combines a high-performance React frontend with a resilient Spring Boot backend ecosystem.

### Tech Stack

**Frontend**
*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite 7](https://vitejs.dev/)
*   **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Video Player**: [Video.js](https://videojs.com/) & [hls.js](https://github.com/video-dev/hls.js)

**Backend**
*   **Language**: Java 21
*   **Framework**: Spring Boot 3.5.7
*   **Gateway**: Spring Cloud Gateway (WebFlux)
*   **Database**: PostgreSQL
*   **Security**: JWT, Bcrypt
*   **Build Tool**: Maven

---

## 📂 Project Structure

Here is an overview of the project structure currently present in your local environment:

```
VStream/
├── ApiGateway/          # Entry point for all client requests; handles routing and load balancing.
├── Frontend/            # The React-based user interface application.
├── users/               # Microservice dedicated to user authentication and account management.
├── profile/             # Microservice for managing user profiles and settings.
├── upload/              # Microservice handling video uploads, storage, and processing.
├── certs/               # Directory for SSL/TLS certificates (if applicable).
├── docker-compose.yml   # Configuration for orchestrating the microservices with Docker.
└── .env                 # Environment variables for configuration.
```

---

## 📐 System Architecture

### 1. High-Level Architecture

The system follows a microservices architecture pattern, ensuring that each component is loosely coupled and independently scalable. The **API Gateway** serves as the central entry point, routing requests to the specific services (Users, Profile, Video) and managing cross-cutting concerns like security and rate limiting.

![System Architecture Diagram](</System_architecture.png>)

**Key Components:**
*   **Client**: The frontend application that users interact with.
*   **API Gateway**: Routes traffic to the appropriate backend services.
*   **Microservices**: Independent services for Users, Profiles, and Video management.
*   **Databases**: Dedicated PostgreSQL instances for each service.
*   **Cloud Storage**: Used for storing large media files (videos, thumbnails).

### 2. Authentication & Verification Flow

Security is managed through a token-based authentication system. When a user logs in, the system verifies credentials and issues a JWT (JSON Web Token). For new accounts or sensitive actions, an OTP (One-Time Password) verification flow is implemented to ensure user identity.

![Authentication Flow Diagram](</Authentication_Architecture.png>)

**Flow Highlights:**
*   **Login**: User submits credentials -> Server verifies hash -> Issues JWT & OTP.
*   **Verification**: User submits OTP -> Server validates -> Account marked as verified.
*   **Session**: JWT is stored securely (e.g., HTTP-only cookies) for subsequent requests.

### 3. Video Upload & Processing Pipeline

The video upload feature is designed to be asynchronous and event-driven to handle large files efficiently without blocking the user experience.

![Video Upload Process Diagram](</diagram-export-11-29-2025-10_27_10-AM.png>)

**Process Workflow:**
1.  **Ingestion**: User uploads a video file. The `Video Service` saves it locally and records the status as `PROCESSING`.
2.  **Queuing**: A job is pushed to the `Video Processing Queue`.
3.  **Processing**: A consumer picks up the job, uses **FFmpeg** to transcode the video into **HLS format** (adaptive bitrate streaming), and updates the status.
4.  **Upload**: Once processed, the files are moved to the `Video Uploading Queue`.
5.  **Archiving**: A final consumer uploads the HLS segments to Cloud Storage, saves the public URLs to the database, and cleans up local temporary files.

---

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+)
*   Java JDK 21
*   Maven
*   PostgreSQL

### Running the Application

1.  **Start Backend Services**:
    Navigate to each service directory (`ApiGateway`, `users`, `profile`, `upload`) and run:
    ```bash
    ./mvnw spring-boot:run
    ```

2.  **Start Frontend**:
    ```bash
    cd Frontend
    npm install
    npm run dev
    ```
    Access the app at `http://localhost:5173`.
