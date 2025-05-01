import { useState } from "react";
import { loginUser, registerUser } from "./api";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isRegister) {
        const response = await registerUser({ name, email, password });
        setSuccess("Registration successful! Please log in.");
        console.log("Register successful:", response.data);
      } else {
        const response = await loginUser({ email, password });
        setSuccess("Login successful!");
        console.log("Login successful:", response.data);

        // Simpan token ke localStorage
        localStorage.setItem("token", response.data.token);

        // Arahkan pengguna ke halaman dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{isRegister ? "Register" : "Login"}</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="toggle-text">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="toggle-link"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setSuccess("");
            }}
          >
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>
      </div>
    </div>
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    if (isRegister) {
      const response = await registerUser({ name, email, password });
      setSuccess("Registration successful! Please log in.");
      console.log("Register successful:", response.data);
    } else {
      const response = await loginUser({ email, password });
      setSuccess("Login successful!");
      console.log("Login successful:", response.data);

      // Simpan token dan data pengguna ke localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Arahkan pengguna ke halaman dashboard
      navigate("/dashboard");
    }
  } catch (err) {
    console.error(err.response?.data?.message || err.message);
    setError(err.response?.data?.message || "An error occurred.");
  }
};



export default Login;