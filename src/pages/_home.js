/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Header from "../components/_header";
import Footer from "../components/_footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const input = {
    height: "50px",
  };

  const btn = {
    fontWeight: "400",
  };

  const [selectedMark, setSelectedMark] = useState("0");

  const [mark, setMark] = useState([]);
  const [idMark, setIdMark] = useState(0);
  const [model, setModel] = useState([]);
  const [idModel, setIdModel] = useState(0);
  const [energy, setEnergy] = useState([]);
  const [idEnergy, setIdEnergy] = useState(0);
  const [transmission, setTransmission] = useState([]);
  const [idTransmission, setIdTransmission] = useState(0);
  const [mileageMin, setMileageMin] = useState(0);
  const [mileageMax, setMileageMax] = useState(9990000000000);
  const [yearMin, setYearMin] = useState(1900);
  const [yearMax, setYearMax] = useState(2024);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(9990000000000);
  const [error, setError] = useState(null);

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleLoadMark = async () => {
    try {
      const url = `https://springboot-production-1101.up.railway.app/marque/get`;

      const response = await axios.get(url);

      setMark(response.data);
      console.log(mark);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const getModels = async (selectedMark) => {
    try {
      const url = `https://springboot-production-1101.up.railway.app/model/getByMarque/${selectedMark}`;

      const response = await axios.get(url);

      setModel(response.data);
      console.log(model);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const handleLoadEnergy = async () => {
    try {
      const url = `https://springboot-production-1101.up.railway.app/energie/getAll`;

      const response = await axios.get(url);

      setEnergy(response.data);
      console.log(energy);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const handleLoadTransmission = async () => {
    try {
      const url = `https://springboot-production-1101.up.railway.app/transmission/getAll`;

      const response = await axios.get(url);

      setTransmission(response.data);
      console.log(transmission);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const search = async () => {
    try {
      const response = await fetch(
        `https://springboot-production-1101.up.railway.app/annonce/recherche/${idMark}/${idModel}/${idTransmission}/${idEnergy}/${priceMin}/${priceMax}/${mileageMin}/${mileageMax}/${yearMin}/${yearMax}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const responseData = await response.json();

      console.log(responseData);
      console.log("hanova");
      setData(responseData, () => {
        console.log(data); // Assurez-vous que cela affiche les données mises à jour.
      });
      // console.log(responseData);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const handleMarkChange = (event) => {
    setSelectedMark(event.target.value);
    getModels(event.target.value);
    setIdMark(event.target.value);
  };

  const handleModelChange = (event) => {
    setIdModel(event.target.value);
  };

  const handleEnergyChange = (event) => {
    setIdEnergy(event.target.value);
  };

  const handleTransmissionChange = (event) => {
    setIdTransmission(event.target.value);
  };

  const handleLoadAnnonce = async () => {
    try {
      const url = `https://springboot-production-1101.up.railway.app/annonce/valide`;

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

  const handleDetailClick = (idAnnonce) => {
    // Rediriger l'utilisateur vers la page de détail avec l'ID de l'annonce
    navigate(`/detail/${idAnnonce}`);
  };

  useEffect(() => {
    // marquerId est récupéré à partir des paramètres d'URL
    handleLoadMark();
    handleLoadEnergy();
    handleLoadTransmission();
    handleLoadAnnonce();
  }, []);

  if (mark == null) {
    console.log("Loading");
    return <div>Loading...marque</div>;
  }

  if (model == null) {
    console.log("Loading");
    return <div>Loading...model</div>;
  }

  if (energy == null) {
    console.log("Loading");
    return <div>Loading...energie</div>;
  }

  if (transmission == null) {
    console.log("Loading");
    return <div>Loading...transmission</div>;
  }

  if (data == null) {
    console.log("Loading");
    return <div>Loading...data</div>;
  }
  return (
    <>
      <Header />
      <div className="container-fluid bg-white pt-3 px-lg-5">
        <form action="#">
          <div className="row mx-n2">
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="Mark">Mark</label>
              <select
                onChange={handleMarkChange}
                className="custom-select px-4 mb-3"
                style={input}
                name="mark"
              >
                <option value="0">Tous</option>
                {mark.map((marque, index) => (
                  <option value={marque.idMarque} key={index}>
                    {marque.nomMarque}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="Model">Model</label>
              <select
                disabled={selectedMark === "0"}
                className="custom-select px-4 mb-3"
                style={input}
                name="model"
                onChange={handleModelChange}
              >
                <option value="0">Tous</option>
                {model.map((model, index) => (
                  <option value={model.idModel} key={index}>
                    {model.nomModel}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="Energy">Energy</label>
              <select
                className="custom-select px-4 mb-3"
                style={input}
                name="energy"
                onChange={handleEnergyChange}
              >
                <option value="0">Tous</option>
                {energy.map((energie, index) => (
                  <option value={energie.idEnergie} key={index}>
                    {energie.nomEnergie}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="Transmission">Transmission</label>
              <select
                className="custom-select px-4 mb-3"
                style={input}
                name="transmission"
                onChange={handleTransmissionChange}
              >
                <option value="0">Tous</option>
                {transmission.map((transmission, index) => (
                  <option value={transmission.idTransmission} key={index}>
                    {transmission.nomTransmission}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="mileage">Mileage min</label>
              <input
                className="form-control px-4 mb-3"
                type="number"
                id="mileage"
                name="mileageMin"
                placeholder="Mileage min"
                // value={mileageMin}
                onChange={(e) => setMileageMin(e.target.value)}
                style={input}
              />
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="mileage">Mileage max</label>
              <input
                className="form-control px-4 mb-3"
                type="number"
                id="mileage"
                name="mileageMax"
                onChange={(e) => setMileageMax(e.target.value)}
                placeholder="Mileage max"
                style={input}
              />
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="year">Year min</label>
              <input
                className="form-control px-4 mb-3"
                type="number"
                id="year"
                name="yearmin"
                placeholder="Year min"
                onChange={(e) => setYearMin(e.target.value)}
                style={input}
              />
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="year">Year max</label>
              <input
                className="form-control px-4 mb-3"
                type="number"
                id="year"
                name="yearmax"
                placeholder="Year max"
                onChange={(e) => setYearMax(e.target.value)}
                style={input}
              />
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="price">Price min</label>
              <input
                className="form-control px-4 mb-3"
                type="number"
                id="prix"
                name="prixmin"
                placeholder="Price min"
                onChange={(e) => setPriceMin(e.target.value)}
                style={input}
              />
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <label htmlFor="price">Price max</label>
              <input
                className="form-control px-4 mb-3"
                type="number"
                id="prix"
                name="prixmax"
                placeholder="Price max"
                onChange={(e) => setPriceMax(e.target.value)}
                style={input}
              />
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 px-2">
              <br />
              <button
                className="btn btn-primary btn-block mb-3 mt-1"
                type="submit"
                style={input}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Find Your Car
          </h1>
          <div className="row">
            {data.map((annonce, index) => (
              <div className="col-lg-4 col-md-6 mb-2" key={index}>
                <div className="rent-item mb-4">
                  {error}
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
    </>
  );
};

export default Home;
