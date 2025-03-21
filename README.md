# GYM Class Training Management System

## Project Overview
The **Training Management System** is designed to streamline the management of trainers, trainees, and training schedules. It facilitates creating and managing users (admins, trainers, and trainees), schedules, bookings, and other related operations. The system ensures smooth operations with features like schedule management, user authentication, and role-based access control.

---


## Technology Stack
The project leverages the following technologies:
- **Backend**: TypeScript, Express.js, Mongoose ODM
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Validation**: Zod
- **Hosting**: [Your hosting platform, e.g., Vercel, AWS, etc.]

---

## API Endpoints
### Auth Routes
- `POST /api/auth/login`  
  **Request**: `{ email, password }`  
  **Response**: `{ token, user }`
- `POST /api/auth/register`  
  **Request**: `{ username, email, password, role }`  
  **Response**: `{ message }`

### User Routes
- `GET /api/users/:id`  
  **Response**: `{ user }`
- `PUT /api/users/:id`  
  **Request**: `{ username, email }`  
  **Response**: `{ updatedUser }`

### Trainer Routes
- `POST /api/trainers`  
  **Request**: `{ username, email, password, specialization }`  
  **Response**: `{ message }`

### Trainee Routes
- `POST /api/trainees`  
  **Request**: `{ username, email, password }`  
  **Response**: `{ message }`

### Schedule Routes
- `POST /api/schedules`  
  **Request**: `{ title, startTime, endTime, trainerId, maxTrainees }`  
  **Response**: `{ message }`

### Booking Routes
- `POST /api/bookings`  
  **Request**: `{ scheduleId, traineeId }`  
  **Response**: `{ message }`
- `PUT /api/bookings/:id/cancel`  
  **Response**: `{ message }`

---

## Database Schema



## API Endpoints  
 Here Is My Api Documentation: 

 https://documenter.getpostman.com/view/28428572/2sAYkBrgBE

## Admin Credentials  

  ## Live Hosting Link

  ### https://gym-class.vercel.app/api/v1

I have deployed my task project on Vercel, but I’m experiencing issues with some API endpoints. Everything works perfectly when running locally, but the deployed version is facing problems with API requests.

- **Gmail**: admin@gmail.com  
- **Password**: admin12345  

## Instructions to Run Locally  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/Melon-ali/gym-class.git  
   cd projectname  

2. **set Env Based On .env.example file**

  ``` npm i
      npm run dev
      
      # gym-class

