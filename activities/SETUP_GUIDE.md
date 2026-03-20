# E-Commerce Application - Setup & Run Guide

## Project Overview

This is a fully-functional e-commerce application with:

- **Backend**: Express.js + MongoDB + JWT authentication
- **Frontend**: React + Vite + React Router
- **Features**: User authentication, product browsing, shopping cart, checkout, admin dashboard

---

## Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local installation - [Download](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (Cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)

---

## Setup Instructions

### Part 1: Backend Setup

#### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required packages including:

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

#### Step 2: Configure Environment Variables

The `.env` file is already created with these values:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=82bfaa0cccbea922fa34bb6eb86ed3605690140ec380456ee37aed6a67b65f9b
NODE_ENV=development
```

**If using MongoDB Atlas instead of local:**

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection URI (looks like: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`)
3. Update `MONGO_URI` in `.env`

#### Step 3: Start MongoDB

**If using local MongoDB:**

```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**If using MongoDB Atlas:**

- No action needed (cloud-hosted)

#### Step 4: Seed the Database with Products

```bash
npm run seed
```

This will populate the database with 10 sample products.

#### Step 5: Start the Backend Server

```bash
npm run dev
```

You should see:

```
Server is running on port 3000
MongoDB Connected: localhost
```

---

### Part 2: Frontend Setup

#### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

This will install:

- `react` - UI library
- `react-router-dom` - Routing
- `react-dom` - React DOM renderer
- `vite` - Build tool
- `axios` - HTTP client (optional, already set up to use fetch)

#### Step 2: Verify Environment Configuration

The `.env` file is already configured:

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=E-Commerce Store
```

No changes needed unless your backend runs on a different port.

#### Step 3: Start the Frontend Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## Testing the Application

### 1. **Sign Up**

- Go to http://localhost:5173
- Click "Sign up"
- Create a new account (email, username, password)
- You'll be logged in and sent to the home page

### 2. **Browse Products**

- Home page displays 10 products from the database
- Use the search bar to filter by product name
- Click on any product to view details

### 3. **Add to Cart**

- On product details page, select quantity and click "Add to Cart"
- Cart data persists in browser local storage

### 4. **View Cart**

- Click "Cart" in navigation
- Update quantities or remove items
- See order summary with total price

### 5. **Checkout**

- Click "Proceed to Checkout"
- Review order summary
- Click "Place Order" to create order in database
- Cart will be cleared automatically

### 6. **Admin Dashboard** (Create Admin User First)

To test admin features, you need to create an admin user:

**Option A: Direct Database Update**

```javascript
// In MongoDB, update your user:
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "Admin" } },
);
```

**Option B: Create new admin user**

- Sign up with email: `admin@example.com`
- Then update role to "Admin" in MongoDB

Once admin:

- Go to http://localhost:5173/admin
- **Add Products**: Fill form with product details
- **Edit Products**: Click "Edit" button in table
- **Delete Products**: Click "Delete" button in table

---

## API Endpoints Reference

### Authentication Routes

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Product Routes

```
GET /api/products           # Get all products
GET /api/products/:id       # Get single product
POST /api/products          # Create (admin only, requires JWT)
PUT /api/products/:id       # Update (admin only, requires JWT)
DELETE /api/products/:id    # Delete (admin only, requires JWT)
```

### Order Routes

```
POST /api/orders            # Create order (requires JWT)
GET /api/orders             # Get user's orders (requires JWT)
```

---

## Project Structure

### Backend (`/backend`)

```
backend/
├── index.js                 # Main server file
├── .env                     # Environment variables
├── package.json             # Dependencies
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   └── Order.js            # Order schema
├── controllers/
│   ├── authController.js   # Auth logic
│   └── productController.js # Product & order logic
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── productRoutes.js    # Product endpoints
│   ├── orderRoutes.js      # Order endpoints
│   └── adminRoutes.js      # Admin endpoints
├── middleware/
│   └── authMiddleware.js   # JWT verification
├── utils/
│   └── validation.js       # Validation utilities
└── seeds/
    └── productSeeds.js     # Database seeding script
```

### Frontend (`/frontend`)

```
frontend/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Dependencies
├── .env                    # Environment variables
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component with routing
│   ├── App.css            # Global styles
│   ├── index.css          # Index styles
│   ├── components/
│   │   ├── Button.jsx     # Button component
│   │   ├── Button.css
│   │   ├── Input.jsx      # Input component
│   │   ├── Input.css
│   │   ├── Card.jsx       # Card component
│   │   └── Card.css
│   ├── contexts/
│   │   ├── AuthContext.jsx    # Auth state management
│   │   └── CartContext.jsx    # Cart state management
│   ├── services/
│   │   └── authService.js     # Auth API calls
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── SignUp.jsx
│   │   ├── Home.jsx           # Product listing
│   │   ├── Home.css
│   │   ├── ProductDetails.jsx # Single product view
│   │   ├── ProductDetails.css
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── Checkout.jsx
│   │   ├── Checkout.css
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProductForm.jsx
│   │   └── AdminDashboard.css
│   └── assets/
```

---

## Troubleshooting

### Backend Issues

**"MongoDB Connected: localhost" not appearing**

- Make sure MongoDB is running
- Check if port 27017 is in use: `netstat -an | grep 27017`
- For MongoDB Atlas, verify MONGO_URI is correct

**"Port 3000 already in use"**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**CORS errors**

- Backend CORS middleware is configured
- Make sure frontend URL is included in CORS origin

### Frontend Issues

**"Cannot find module" errors**

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use**

```bash
# Vite will try port 5174, 5175, etc automatically
# Or kill process using port 5173
```

**API calls failing with 401/403**

- Check that JWT token is in localStorage
- Verify Authorization header format: `Bearer <token>`
- Make sure backend server is running

---

## Development Workflow

### Make Code Changes

1. **Backend**: Changes in `/backend` auto-reload with `nodemon`
2. **Frontend**: Changes in `/frontend` auto-reload with Vite HMR

### Build for Production

**Backend**: No build needed (Node.js runs directly)

**Frontend**:

```bash
cd frontend
npm run build
```

This creates a `/frontend/dist` folder ready for deployment.

---

## Features Implemented

✅ User Authentication (Sign up, Login, Logout)
✅ JWT Token-based Authorization
✅ Product Listing with Search/Filter
✅ Shopping Cart (with localStorage persistence)
✅ Checkout Process
✅ Order Creation
✅ Admin Product Management (CRUD)
✅ Role-based Access Control (User vs Admin)
✅ Responsive Design (Mobile, Tablet, Desktop)
✅ Form Validation
✅ Error Handling

---

## Next Steps / Future Enhancements

1. **Payment Integration**: Add Stripe/PayPal for real payments
2. **Product Reviews**: Let users rate and review products
3. **Order History**: Users can view past orders
4. **Email Notifications**: Send confirmation emails on orders
5. **Advanced Filtering**: Filter by price, category, rating
6. **Wishlist**: Save favorite products
7. **Product Images Upload**: Direct upload instead of URLs
8. **Analytics Dashboard**: Admin can see sales, users, etc.
9. **Inventory Management**: Track stock levels in real-time
10. **Deployment**: Deploy to Heroku, Vercel, AWS, etc.

---

## Useful Commands

```bash
# Backend
cd backend
npm install      # Install dependencies
npm run dev     # Start development server
npm run seed    # Seed database with products

# Frontend
cd frontend
npm install      # Install dependencies
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run preview # Preview production build

# Full Stack (from root, if you split terminals)
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

---

## Database Schema

### Users

```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (User, Admin, Moderator),
  createdAt: Date,
  updatedAt: Date
}
```

### Products

```javascript
{
  name: String,
  price: Number,
  description: String,
  image: String (URL),
  countInStock: Number,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders

```javascript
{
  userId: ObjectId (ref: User),
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: String (Pending, Processing, Shipped, Delivered),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security Notes

⚠️ **Production Checklist:**

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas in production (not local)
- [ ] Enable HTTPS
- [ ] Add rate limiting on auth endpoints
- [ ] Implement CSRF protection
- [ ] Use environment-based configuration
- [ ] Add CORS whitelist for specific domains
- [ ] Implement refresh tokens
- [ ] Add password reset functionality
- [ ] Enable MongoDB authentication

---

## Support

For issues or questions:

1. Check the **Troubleshooting** section above
2. Review console logs (browser DevTools & terminal)
3. Verify all prerequisites are installed
4. Check that both backend and frontend servers are running
5. Ensure MongoDB is accessible

---

**Project completed!** 🎉 All functional requirements have been implemented.
