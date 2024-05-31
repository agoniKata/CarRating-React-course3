import styles from "./RatingContainerStyle.module.css";
import { cars } from "../../../data.js";
import { useState, useEffect } from "react";

export function RatingContainer({ ratingCar }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/cars/all")
      .then((res) => res.json())
      .then((result) => setCars(result));
  });

  return (
    <div className={styles.container}>
      <h3>Рейтинг автомобилей</h3>
      <div className={styles.box}>
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className={styles.list}>
              <div className={styles.imgBx}>
                <img src={car.src} alt={car.nameCar} />
              </div>
              <div className={styles.content}>
                <p>{car.carName}</p>
                <h2 className={styles.rank}>
                  <small>#{car.rating}</small>{" "}
                </h2>
                <h4>{car.nameCar}</h4>
                <p>{car.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Вы еще не дали оценку</p>
        )}
      </div>
    </div>
  );
}
