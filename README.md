# PostHub - MERN Integration

## Project Overview

PostHub is a full-stack MERN application where users can register, log in, create, manage, and explore posts. Authenticated users can upload images, edit or delete their own posts, and view posts created by other users. Images are uploaded to Cloudinary, while user authentication is handled using JWT stored in HTTP-only cookies.

---

## Live Links

| Resource | Link |
|----------|------|
| GitHub Repository | https://github.com/Vikas123Rathore/MERN-INTEGERATION/tree/main |
| Backend API | https://mern-integeration.onrender.com/ |
| project link | https://mern-integeration-frontend.onrender.com/ |

---

## Features

### Authentication

- User Registration
- User Login
- User Logout
- Current User Authentication
- JWT Authentication using HTTP-only Cookies

### Posts

- Create a New Post
- Upload Images using Cloudinary
- View All Posts
- View Single Post
- Edit Own Post
- Delete Own Post
- View My Posts
- Latest Posts Section

### User Interface

- Responsive Design
- Mobile Friendly Navbar
- Beautiful Card Layout
- Toast Notifications
- Loading Spinner
- Error Handling

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- Cookie Parser
- dotenv

---

## Folder Structure

```text
MERN Integration
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── public
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── components
│   ├── context
│   ├── pages
│   ├── .env.example
│   ├── App.jsx
│   └── package.json
│
├── README.md
└── PROMPT.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project folder.

```bash
cd MERN-Integration
```

---

## Backend Setup

Move into backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend server.

```bash
npm run dev
```

---

## Frontend Setup

Move into frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the frontend folder.

Example:

```env
VITE_SERVER_URL=http://localhost:8000/api
```

Start frontend.

```bash
npm run dev
```

---

## API Endpoints

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/user/register | Register User |
| POST | /api/user/login | Login User |
| POST | /api/user/logout | Logout User |
| GET | /api/user/current-user | Get Current User |

### Post Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/post | Get All Posts |
| GET | /api/post/top | Get Top Recent Posts |
| GET | /api/post/:id | Get Single Post |
| POST | /api/post | Create Post |
| PUT | /api/post/:id | Update Post |
| DELETE | /api/post/:id | Delete Post |

---

## Authentication

Authentication is implemented using JWT.

After successful login or registration:

- JWT Token is generated.
- Token is stored inside an HTTP-only Cookie.
- Protected routes are secured using authentication middleware.

---

## Image Upload

Images are uploaded using:

- Multer
- Cloudinary

The uploaded image URL is stored in MongoDB.

---

## State Management

React Context API is used for:

- User Authentication
- Post Management

---

## Future Improvements

- Like and Unlike Posts
- Comment System
- Search Posts
- Pagination
- User Profile
- Edit Profile
- Dark / Light Theme
- Bookmark Posts

---

## Environment Variables

### Backend

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend

```env
VITE_SERVER_URL=http://localhost:8000/api
```

---

## Author

**Vikas Rathore**

Associate Software Engineer

B.Tech Information Technology

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

---

## License

This project is developed for learning purposes under the Prodesk IT MERN Integration Sprint.
