/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Footer from "../components/_footer";
import HeaderIndex from "../components/_headerIndex";
import ModalRight from "../components/_modalRight";
// import "../components/script";
import "../animation/_animation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AfterLogin = () => {
  const second = {
    width: "60px",
    height: "60px",
    cursor: "pointer",
  };
  const btn = {
    fontWeight: "400",
  };
  const loko = {
    color: "red",
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [annonce, setAnnonce] = useState(null);
  const navigate = useNavigate();

  const handleLoadAnnonce = async () => {
    try {
      const token = localStorage.getItem("token");
      const idUser = localStorage.getItem("idUser");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = ` https://springboot-production-1101.up.railway.app/annonce/valideNotUser/${idUser}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const addFavoris = async (idAnnonce) => {
    try {
      const token = localStorage.getItem("token");
      const idUser = localStorage.getItem("idUser");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      await fetch("https://springboot-production-1101.up.railway.app/insertFavoris", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUtilisateur: idUser,
          annonce: {
            idAnnonce: idAnnonce,
          },
        }),
      });
      handleLoadAnnonce();
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const removeFavoris = async (idAnnonce) => {
    try {
      const token = localStorage.getItem("token");
      const idUser = localStorage.getItem("idUser");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      await fetch("https://springboot-production-1101.up.railway.app/deleteFavoris", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUtilisateur: idUser,
          annonce: {
            idAnnonce: idAnnonce,
          },
        }),
      });
      handleLoadAnnonce();
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  useEffect(() => {
    // marquerId est récupéré à partir des paramètres d'URL
    handleLoadAnnonce();
  }, []);

  const handleDetailClick = (idAnnonce) => {
    // Rediriger l'utilisateur vers la page de détail avec l'ID de l'annonce
    navigate(`/detailIndex/${idAnnonce}`);
  };

  if (data == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderIndex />
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Find Your Car
          </h1>
          <div className="row">
            {data.map((annonce, index) => (
              <div className="col-lg-4 col-md-6 mb-2" key={index}>
                <div className="rent-item mb-4">
                  {annonce.favoris === false ? (
                    <button
                      className="d-flex align-items-center justify-content-center bg-primary ml-n5 btn btn-primary px-3 mb-2"
                      style={second}
                      onClick={() => addFavoris(annonce.idAnnonce)}
                    >
                      <i className="fa fa-1x fa-heart"></i>
                    </button>
                  ) : (
                    <button
                      className="d-flex align-items-center justify-content-center bg-primary ml-n5 btn btn-primary px-3 mb-2"
                      style={second}
                      onClick={() => removeFavoris(annonce.idAnnonce)}
                    >
                      <i className="fa fa-1x fa-heart" style={loko}></i>
                    </button>
                  )}

                  {annonce.photos.length > 0 ? (
                    <img
                      className="img-fluid mb-4"
                      src={"data:image/jpeg;base64," + annonce.photos[0].bin}
                      alt=""
                    />
                  ) : (
                    <p className="text-muted">
                      Vous n'avez pas encore de photo
                    </p>
                  )}
                  <h4 className="text-uppercase mb-4">
                    {annonce.model.nomModel}
                  </h4>
                  <h5 className=" mb-4">
                    Mark : {annonce.model.marque.nomMarque}
                  </h5>
                  <h5 className="text-uppercase mb-4">{annonce.prix} MGA</h5>
                  <div className="d-flex justify-content-center mb-4">
                    <div className="px-2">
                      <i className="fa fa-calendar-alt text-primary mr-1"></i>
                      <span>{annonce.annee}</span>
                    </div>
                    <div className="px-2 border-left border-right">
                      <i className="fa fa-cogs text-primary mr-1"></i>
                      <span>{annonce.transmission.nomTransmission}</span>
                    </div>
                    <div className="px-2">
                      <i className="fa fa-road text-primary mr-1"></i>
                      <span>{annonce.kilometrage}K</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary px-3"
                    onClick={() => handleDetailClick(annonce.idAnnonce)}
                    style={btn}
                  >
                    <i className="fas fa-info-circle "></i>{" "}
                    <span>Car Detail</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ModalRight />
    </>
  );
};

export default AfterLogin;
