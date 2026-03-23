# Selenium Automation Tests

## How to Run Tests

### Prerequisites
- Node.js installed
- Frontend running: `http://localhost:5173`
- Backend running: `http://localhost:3000`

### Setup
```bash
npm install

# Run all tests
npm test

# Run specific test
node TESTCASES/ValidLogin.js
node TESTCASES/InvalidLogin.js
node TESTCASES/EmptyFields.js
node TESTCASES/Logout.js

