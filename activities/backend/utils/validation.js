// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation - at least 6 characters
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Product name validation
export const isValidProductName = (name) => {
  return name && name.trim().length > 0;
};

// Price validation - must be positive number
export const isValidPrice = (price) => {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0;
};

// Stock count validation - must be non-negative integer
export const isValidStock = (stock) => {
  const num = parseInt(stock);
  return !isNaN(num) && num >= 0;
};

// Generic validation function
export const validateRequired = (value, fieldName) => {
  if (!value) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }
  if (!isValidEmail(email)) {
    return "Email format is invalid";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (!isValidPassword(password)) {
    return "Password must be at least 6 characters";
  }
  return null;
};
