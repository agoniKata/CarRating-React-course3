import React, { useState } from "react";
import styles from "./ImageComponentStyle.module.css";
import axios from "axios";
import { RatingContainer } from "../RatingList/RatingContainer/RatingContainer";

const ImageComponent = ({ src, idCar, nameCar, handleRatingCar }) => {
  const [rate, setRate] = useState(null);
  const [showRatingSection, setShowRatingSection] = useState(true);
  const [showThankSection, setShowThankSection] = useState(false);

  const handleRatingClick = (rating) => {
    setRate(rating);
  };

  const handleSubmit = () => {
    if (rate) {
      updateCarRating(src, rate);
    }
  };

  const updateCarRating = (src, rating) => {
    axios
      .put("http://localhost:8082/cars/updateRating", null, {
        params: {
          src: src,
          rating: rating,
        },
      })
      .then(() => {
        setShowRatingSection(false);
        setShowThankSection(true);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении рейтинга машины:", error);
      });
  };

  const fetchCarInfo = () => {
    axios
      .get("http://localhost:8082/cars/find", {
        params: {
          view: 1,
        },
      })
      .then((response) => {
        handleRatingCar(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении информации об автомобилях:", error);
      });
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_container}>
        {showRatingSection && (
          <div className={styles.rating_section}>
            <div className={styles.star_icon}>
              <img src={src} alt="star" />
            </div>

            <div className={styles.ratings}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <span key={rating} onClick={() => handleRatingClick(rating)}>
                  {rating}
                </span>
              ))}
            </div>
            <button className={styles.submit_btn} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
        {showThankSection && (
          <div className={styles.thank_section}>
            <img src="star.png" alt="thank you" />
            <div className={styles.chip}>
              <p>
                You selected <span id="rate">{rate}</span> out of 5
              </p>
            </div>
            <h2 className={styles.title}>Thank you!</h2>
            <p className={styles.description}>
              We appreciate you taking the time to give a rating. If you ever
              need more support, don’t hesitate to get in touch!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
