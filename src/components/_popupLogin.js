import React, { useState } from "react";
import "../style/components/popup.css";
import { useNavigate } from "react-router-dom";

const PopupLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("fehizoro@gmail.com");
  const [password, setPassword] = useState("fehizoro");
  const [error, setError] = useState(null);

  // const [redirectToHome, setRedirectToHome] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://springboot-production-1101.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            mdp: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const idUser = data.idUser;
        console.log(data);

        if (token == null) {
          navigate("/");
        } else {
          localStorage.setItem("token", token);
          localStorage.setItem("idUser", idUser);
          // setRedirectToHome(true);
          navigate("/afterlogin");
        }
      } else {
        console.log("huhuhuhhu");
        setError(
          "Erreur d'authentification. Veuillez vérifier vos informations."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête d'authentification:", error);
      setError("Erreur d'authentification. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          X
        </span>
        <form>
          <h4>Please check your information!</h4>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin} type="submit">
            Login
          </button>
          {error}
        </form>
      </div>
    </div>
  );
};

export default PopupLogin;
