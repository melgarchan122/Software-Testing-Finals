import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import "./login.css";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      console.log(user);
      alert("login successful!(This is a mock implementation)");
      console.log("Form Data;", formData);
    } catch (err) {
      setErrors({ error: err.message });
    }
  };

  return (
    <Card title="Welcome Back!">
      <form onSubmit={() => {}} className="Login-form">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="Password"
          name="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your Password"
          required
        />
        <Button type="submit" loading={false}>
          Login
        </Button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </Card>
  );
}
