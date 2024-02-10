/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import HeaderInfoIndex from "../components/_headerInfoIndex";
import Footer from "../components/_footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const btn = {
    fontWeight: "400",
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { idUser } = useParams();
  const navigate = useNavigate();

  const getMyAnnonce = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = `https://springboot-production-1101.up.railway.app/annonce/valide/${idUser}`;

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
    getMyAnnonce();
  }, []);

  const handleDetailClick = (idAnnonce) => {
    // Rediriger l'utilisateur vers la page de détail avec l'ID de l'annonce
    navigate(`/detailannouncements/${idAnnonce}`);
  };

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray.slice(0, 3);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString();
    return formattedDate;
  };

  if (data == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }
  return (
    <>
      <HeaderInfoIndex />
     
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Your Announcements
          </h1>
          <div className="row">
            {data.map((annonce, index) => (
              <div className="col-lg-4 col-md-6 mb-2" key={index}>
                <div className="rent-item mb-4">
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
                  <h6 className="mb-4">
                    Creation Date: {formatDate(annonce.daty)}
                  </h6>
                  {annonce.dateValidation == null ? (
                    <h6 className="mb-4">Date of sale: Not yet validate</h6>
                  ) : (
                    <h6 className="mb-4">
                      Validation Date: {formatDate(annonce.dateValidation)}
                    </h6>
                  )}
                  {annonce.datevente == null ? (
                    <h6 className="mb-4">Date of sale: Not yet sold</h6>
                  ) : (
                    <h6 className="mb-4">
                      Date of sale: {formatDate(annonce.datevente)}
                    </h6>
                  )}
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
    </>
  );
};

export default Announcements;
