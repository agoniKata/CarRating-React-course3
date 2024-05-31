import styles from "./ContainerStyle.module.css";

import ImageComponent from "../Image/ImageComponent";
import { useState, useEffect } from "react";
import axios from "axios";
export function Container({ myCarList, handleRatingCar }) {
  const [carInfo, setCarInfo] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8082/cars/find", {
        params: {
          view: 1,
        },
      })
      .then((response) => {
        setCarInfo(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении информации об автомобиле:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.imageContainer}>
        {carInfo &&
          carInfo.map((car, index) => (
            <ImageComponent key={index} src={car.src} nameCar={car.nameCar} />
          ))}
      </div>
    </>
  );
}
