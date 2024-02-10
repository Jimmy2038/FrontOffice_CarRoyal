/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import HeaderInfoIndex from "../components/_headerInfoIndex";
import Footer from "../components/_footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const btn = {
    "font-weight": "400",
  };
  const second = {
    width: "60px",
    height: "60px",
    cursor: "pointer",
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { idUser } = useParams();
  const navigate = useNavigate();

  const handleLoadAnnonce = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = ` https://springboot-production-1101.up.railway.app/favoris/${idUser}`;

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

  useEffect(() => {
    // marquerId est récupéré à partir des paramètres d'URL
    handleLoadAnnonce();
  }, []);

  const handleDetailClick = (idAnnonce) => {
    // Rediriger l'utilisateur vers la page de détail avec l'ID de l'annonce
    navigate(`/detailIndex/${idAnnonce}`);
  };
  return (
    <>
      <HeaderInfoIndex />
    
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Your Favorites
          </h1>
          <div className="row">
            {data.map((favoris, index) => (
              <div className="col-lg-4 col-md-6 mb-2" key={index}>
                <div className="rent-item mb-4">
                  {favoris.annonce.photos.length > 0 ? (
                    <img
                      className="img-fluid mb-4"
                      src={
                        "data:image/jpeg;base64," +
                        favoris.annonce.photos[0].bin
                      }
                      alt=""
                    />
                  ) : (
                    <p className="text-muted">
                      Vous n'avez pas encore de photo
                    </p>
                  )}
                  <h4 className="text-uppercase mb-4">
                    {favoris.annonce.model.nomModel}
                  </h4>
                  <h5 className=" mb-4">
                    Mark : {favoris.annonce.model.marque.nomMarque}
                  </h5>
                  <h5 className="text-uppercase mb-4">
                    {favoris.annonce.prix} MGA
                  </h5>
                  <div className="d-flex justify-content-center mb-4">
                    <div className="px-2">
                      <i className="fa fa-calendar-alt text-primary mr-1"></i>
                      <span>{favoris.annonce.annee}</span>
                    </div>
                    <div className="px-2 border-left border-right">
                      <i className="fa fa-cogs text-primary mr-1"></i>
                      <span>
                        {favoris.annonce.transmission.nomTransmission}
                      </span>
                    </div>
                    <div className="px-2">
                      <i className="fa fa-road text-primary mr-1"></i>
                      <span>{favoris.annonce.kilometrage}K</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary px-3"
                    onClick={() => handleDetailClick(favoris.annonce.idAnnonce)}
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
    </>
  );
};

export default Favorites;
