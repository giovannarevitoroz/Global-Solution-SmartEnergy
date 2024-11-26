"use client";
import { useState } from "react";

const CalculoCO2 = () => {
  const [formData, setFormData] = useState({
    coal_electricity: "",
    biofuel_electricity: "",
    fossil_electricity: "",
    gas_electricity: "",
    hydro_electricity: "",
    nuclear_electricity: "",
    oil_electricity: "",
    other_renewable_exc_biofuel_electricity: "",
    solar_electricity: "",
    wind_electricity: "",
  });

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict_regression_carbon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(`Emissão de Carbono prevista: ${data.prediction} milhões de toneladas por ano`);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error predicting carbon emission.");
    }
  };

  const labels: Record<string, string> = {
    coal_electricity: "Geração em TWh ao ano a partir de carvão",
    biofuel_electricity: "Geração em TWh ao ano a partir de biocombustível",
    fossil_electricity: "Geração em TWh ao ano a partir de combustíveis fósseis",
    gas_electricity: "Geração em TWh ao ano a partir de gases naturais",
    hydro_electricity: "Geração em TWh ao ano a partir de hidrelétricas",
    nuclear_electricity: "Geração em TWh ao ano a partir de usinas nucleares",
    oil_electricity: "Geração em TWh ao ano a partir de óleo",
    other_renewable_exc_biofuel_electricity: "Geração em TWh ao ano a partir de outras fontes renováveis (geotérmica, maré)",
    solar_electricity: "Geração em TWh ao ano a partir de energia solar",
    wind_electricity: "Geração em TWh ao ano a partir de energia eólica",
  };

  return (
    <div>
      <h1>Predição de Emissão de Carbono</h1>
      <p>Para maior precisão, utilize valores realistas (Ex: a China gera em média 7500 TWh por ano, portanto, utilize valores baixos)</p>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{labels[key]}:</label>
            <input
              type="number"
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Prever</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default CalculoCO2;