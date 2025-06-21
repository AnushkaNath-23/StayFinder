# StayFinder - Airbnb Clone

StayFinder is a full-stack web application that allows users to browse, book, and list properties for short-term stays. It's built with a React frontend and Node.js/Express backend.

## Features

- User authentication (register, login)
- Property listings with search and filtering
- Booking system
- Host dashboard for managing listings
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/stayfinder
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRES_IN=7d
     ```

### Running the Application

#### Development Mode

Run both frontend and backend concurrently:
```
npm run dev:full
```

Or run them separately:

Backend only:
```
npm run server
```

Frontend only:
```
npm run client
```

#### Seed the Database

Populate the database with sample data:
```
npm run seed
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (protected)

#### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get a single listing
- `POST /api/listings` - Create a new listing (host only)
- `PUT /api/listings/:id` - Update a listing (host only)
- `DELETE /api/listings/:id` - Delete a listing (host only)
- `GET /api/listings/host/listings` - Get host's listings (host only)

#### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get a booking by ID
- `PUT /api/bookings/:id` - Update booking status
- `GET /api/bookings/host/bookings` - Get bookings for host's listings (host only)

## Demo Accounts

After running the seed script, you can use these accounts:

- Host: 
  - Email: host@example.com
  - Password: password123

- Guest:
  - Email: guest@example.com
  - Password: password123