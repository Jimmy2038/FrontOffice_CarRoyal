/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import LogoutButton from "./_logout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const handleLinkClick = (event) => {
  // Annule le comportement par défaut du lien si l'attribut href est absent
  if (!event.currentTarget.getAttribute("href")) {
    event.preventDefault();
  }
};
const NavbarIndex = () => {
  const navigate = useNavigate();

  const handleMyAnnonceClick = () => {
    // Récupère idUser depuis le localStorage
    const idUser = localStorage.getItem("idUser");

    // Vérifie si idUser existe dans le localStorage
    if (idUser) {
      // Redirige l'utilisateur vers la page "announcements" avec l'idUser
      navigate(`/announcements/${idUser}`);
    } else {
      console.error("idUser not found in localStorage");
      // Gérer le cas où idUser n'est pas trouvé dans le localStorage
    }
  };

  const handleMyFavoriteClick = () => {
    // Récupère idUser depuis le localStorage
    const idUser = localStorage.getItem("idUser");

    // Vérifie si idUser existe dans le localStorage
    if (idUser) {
      // Redirige l'utilisateur vers la page "announcements" avec l'idUser
      navigate(`/favorites/${idUser}`);
    } else {
      console.error("idUser not found in localStorage");
      // Gérer le cas où idUser n'est pas trouvé dans le localStorage
    }
  };

  const handleMyMessageClick = () => {
    // Récupère idUser depuis le localStorage
    const idUser = localStorage.getItem("idUser");

    // Vérifie si idUser existe dans le localStorage
    if (idUser) {
      // Redirige l'utilisateur vers la page "announcements" avec l'idUser
      navigate(`/friends/${idUser}`);
    } else {
      console.error("idUser not found in localStorage");
      // Gérer le cas où idUser n'est pas trouvé dans le localStorage
    }
  };

  return (
    <>
      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative px-lg-5 navigation">
          <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <a href="" className="navbar-brand">
              <h1 className="text-uppercase text-primary mb-1">Royal Cars</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
                 <Link
                  className="nav-item nav-link active"
                  to="/afterlogin"
                  onClick={handleLinkClick}
                >
                     <span className="ml-1">Home</span>
                </Link>
                <a
                  onClick={handleMyFavoriteClick}
                  className="nav-item nav-link"
                >
               
                  Favorites
                </a>
                <a onClick={handleMyAnnonceClick} className="nav-item nav-link">
                  Announcements Historique
                </a>
                <a
                  className="nav-item nav-link"
                  id="message"
                  onClick={handleMyMessageClick}
                >
                  <i className="fab fa-facebook-messenger "></i>
                </a>
                <LogoutButton />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarIndex;
