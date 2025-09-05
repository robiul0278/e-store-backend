
---

## **Backend README.md**

```markdown
# E-Store Backend

This is the **backend** of the E-Store project, built using **Node.js, Express.js, MongoDB**, and **Mongoose**. It handles user authentication, product and order management, and provides RESTful API endpoints for the frontend.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)


---

## Project Overview

The backend provides APIs to handle authentication, CRUD operations for products and orders, and role-based access for users. It integrates with MongoDB for database storage and uses JWT for secure authentication.

---

## Technologies Used

- **Node.js & Express.js**  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT & bcrypt  
- **Libraries:** Axios, dotenv, cors, express-validator  

---

## Features

- User authentication and registration  
- JWT-based login and role-based access control  
- CRUD operations for products and orders  
- Filter orders by date, status, or user  
- Secure API endpoints with authentication middleware  

---

## Getting Started

### Prerequisites

- Node.js >= 18.x  
- npm or yarn  
- MongoDB (Atlas or local instance)  

### Installation

```bash
git clone https://github.com/robiul0278/e-store-backend.git
cd e-store-backend
npm install
