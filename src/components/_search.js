/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const input = {
    height: "50px",
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

  const handleMarkChange = (event) => {
    setSelectedMark(event.target.value);
    getModels(event.target.value);
    setIdMark(event.target.values);
  };

  const handleModelChange = (event) => {
    setIdModel(event.target.values);
  };

  const handleEnergyChange = (event) => {
    setIdEnergy(event.target.values);
  };

  const handleTransmissionChange = (event) => {
    setIdTransmission(event.target.values);
  };

  useEffect(() => {
    // marquerId est récupéré à partir des paramètres d'URL
    handleLoadMark();
    handleLoadEnergy();
    handleLoadTransmission();
  }, []);

  if (mark == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  if (model == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  if (energy == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  if (transmission == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  return (
    <>
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
    </>
  );
};

export default Search;
