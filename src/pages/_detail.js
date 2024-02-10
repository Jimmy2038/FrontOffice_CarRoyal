/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import HeaderInfo from "../components/_headerInfo";
import Footer from "../components/_footer";
import Popup from "../components/_popup";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const second = {
    width: "80px",
    height: "80px",
  };
  const img = {
    height: "15rem",
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    localStorage.setItem("idAnnonce", data.idAnnonce);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { idAnnonce } = useParams();

  const handleLoadDetail = async () => {
    try {
      const url = ` https://springboot-production-1101.up.railway.app/annonce/getByIdAnnonce/${idAnnonce}`;

      const response = await axios.get(url);

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
    handleLoadDetail();
  }, []);

  if (data == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }
  return (
    <>
      <HeaderInfo />
  
      {error}
      <div className="container-fluid pt-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase mb-5">
            {data.model.nomModel}
          </h1>
          <div className="row align-items-center pb-2">
            <div className="col-lg-6 mb-4">
              {data.photos.length > 0 ? (
                <img
                  className="img-fluid mb-4"
                  src={"data:image/jpeg;base64," + data.photos[0].bin}
                  alt=""
                />
              ) : (
                <p className="text-muted">Vous n'avez pas encore de photo</p>
              )}
            </div>
            <div className="col-lg-6 mb-4">
              <h4 className="mb-2">{data.prix} MGA</h4>
              <h5 className="mb-2"> Mark : {data.model.marque.nomMarque}</h5>
              {/* <div className="d-flex mb-3">
                <h6 className="mr-2">
                  <i className="fa fa-2x fa-user-circle  text-secondary"></i>
                </h6>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <small>MOREL BEN Taboaly</small>
                </div>
              </div> */}
              <p>{data.descri}</p>
              <div className="d-flex pt-1">
                <button className="btn btn-primary px-3" onClick={openPopup}>
                  <span>Se connecter si interesser</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-5">
          <div className="container pb-3">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-2">
                <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3 ">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={second}
                    >
                      <i className="fa fa-2x fa-charging-station text-secondary"></i>
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">01</h1>
                  </div>
                  <h5 className="text-uppercase mb-3">Car Energy</h5>
                  <p className="m-0">{data.energie.nomEnergie}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={second}
                    >
                      <i className="fa fa-2x fa-cogs text-secondary"></i>
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">02</h1>
                  </div>
                  <h5 className="text-uppercase mb-3">Car Transmission</h5>
                  <p className="m-0">{data.transmission.nomTransmission}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={second}
                    >
                      <i className="fa fa-2x fa-road text-secondary"></i>
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">03</h1>
                  </div>
                  <h5 className="text-uppercase mb-3">Car Mileage</h5>
                  <p className="m-0">{data.kilometrage} km</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-2">
                <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={second}
                    >
                      <i className="fa fa-2x fa-calendar-alt  text-secondary"></i>
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">04</h1>
                  </div>
                  <h5 className="text-uppercase mb-3">Car Year</h5>
                  <p className="m-0">{data.annee}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="container pb-3">
            <div className="row">
              {data.photos.map((photo, index) => (
                <div className="col-lg-4 mb-4" key={index}>
                  <img
                    className="img-fluid"
                    src={"data:image/jpeg;base64," + photo.bin}
                    alt=""
                    style={img}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default Detail;
