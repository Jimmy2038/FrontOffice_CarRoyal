/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchIndex = () => {
  const input = {
    height: "50px",
  };
  const [selectedMark, setSelectedMark] = useState("0");
  const handleMarkChange = (event) => {
    setSelectedMark(event.target.value);
    getModels(event.target.value);
  };

  const [mark, setMark] = useState([]);
  const [model, setModel] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [error, setError] = useState(null);

  const handleLoadMark = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = `https://springboot-production-1101.up.railway.app/marque/get`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = `https://springboot-production-1101.up.railway.app/model/getByMarque/${selectedMark}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = `https://springboot-production-1101.up.railway.app/energie/getAll`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = `https://springboot-production-1101.up.railway.app/transmission/getAll`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransmission(response.data);
      console.log(transmission);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
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
                defaultValue="0"
                required
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
                defaultValue=""
                placeholder="Mileage max"
                required
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
                defaultValue=""
                required
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
                defaultValue="2024"
                required
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
                defaultValue="0"
                required
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
                defaultValue=""
                required
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

export default SearchIndex;
