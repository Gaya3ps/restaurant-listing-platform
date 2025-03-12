# Restaurant Listing Platform

A simple and user-friendly Restaurant Listing Platform built using React.js for the frontend and Node.js for the backend. This application allows users to view, add, update, and delete restaurants with secure API calls.
---

## Features
- **Show Restaurants**: Users can view a list of restaurants with the following details: Name, Address, Contact Information.
- **Add New Restaurants**: Users can add new restaurants through a form on the frontend.
- **Update Restaurants**: Users can edit and update existing restaurant details like name, address, and contact information.
- **Delete Restaurants**: Users can remove restaurants from the platform.
- **Responsive UI Design**: The platform uses Material-UI and Framer Motion for a clean, responsive, and animated interface.
- **Snackbar Notifications**: Real-time success or error notifications for every action (add, update, delete).


---
## Technology Stack
### Frontend:
- **React**
- **React Router DOM**: For navigation.
- **Material-UI**:For responsive and professional UI components.
- **Framer Motion**: For animations and smooth transitions.
- **Axios**: For API requests.

### Backend:
- **Node.js (Express framework)**
- **Mongoose**: For MongoDB integration.
- **JWT (Json Web Tokens)**: For secure user authentication.

---

## Live Demo
The application is deployed and accessible at:  
**[Deployed URL](https://restaurant-listing-platform.vercel.app/)**

---
#
## Prerequisites
- Node.js installed on your local machine.
- Git installed for version control.
- MongoDB (local or cloud-based)
- NPM or Yarn


---

## Installation

### Clone the Repository
Clone the repository and navigate into it:
```bash
git clone https://github.com/Gaya3ps/restaurant-listing-platform.git
cd restaurant-listing-platform
cd backend
npm install
cd ../frontend
npm install

Create a .env file in  backend directories and add the necessary environment variables. 
For Backend:
Example:
JWT_SECRET = 
MONGO_URL=
PORT=

For Frontend / client:
VITE_API_URL=http://localhost:5000
Run the Application Locally:
Backend
Start the backend server:
cd backend
npm start
Frontend
Start the frontend / client server:
cd frontend
npm run dev

Access the Application:
Frontend: http://localhost:5173
Backend: http://localhost:5000

Contributing
Contributions are welcome! 
Feel free to fork the repository and submit a pull request.
