// ImageList.js

import styles from "./ImageListStyle.module.css";
import { cars } from "../../../data.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { RatingContainer } from "../RatingContainer/RatingContainer.jsx";

export function ImageList({ onAddToCart }) {
  const [carsList, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ src: "", carName: "" });

  useEffect(() => {
    fetch("http://localhost:8082/cars/all")
      .then((res) => res.json())
      .then((result) => setCars(result));
  });

  const handleAddToCart = (car) => {
    if (car.view === 1) {
      return;
    }
    axios
      .put("http://localhost:8082/cars/updateView", null, {
        params: {
          src: car.src,
          view: car.view + 1,
        },
      })
      .then(() => {
        const updatedCarsList = carsList.map((c) => {
          if (c.src === car.src) {
            return { ...c, view: c.view + 1 };
          }
          return c;
        });
        setCars(updatedCarsList);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении количества просмотров:", error);
      });
  };

  return (
    <div className={styles.items}>
      {carsList.map((car, index) => (
        <div key={car.src} className={styles.item}>
          <img src={car.src} alt={car.carName} />
          <h2>{car.carName}</h2>
          <div
            className={styles.addToCart}
            onClick={() => handleAddToCart(car)}
          >
            +
          </div>
        </div>
      ))}
      <RatingContainer />
    </div>
  );
}
