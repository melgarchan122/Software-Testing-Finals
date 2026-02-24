const API_URL = "http://localhost:3000/api/auth/";

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userData), //Serialize
    });

    const data = await response.json(); //Promise

    if (!response.ok) {
      throw new Error(data.message || "Registration Failed");
    }
    return data;
  },
  async register(userData) {},
  async logout() {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData), //Serialize
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return response.ok;
  },

  getCurrentUser() {
    const userJson = localStorage.getItem("user");
    if (userStr) {
      return JSON.stringify(userJson);
    }
    return null;
  },
  getToken() {
    return localStorage.getItem("token");
  },
  isAuthenticated() {
    return !!this.getToken();
  },
};
