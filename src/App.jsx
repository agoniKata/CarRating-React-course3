import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import { Container } from "./component/Container/Container";
import { RatingContainer } from "./component/RatingList/RatingContainer/RatingContainer";
import "./App.css";
import { ImageList } from "./component/RatingList/ImageList/ImageList";
import { useState } from "react";
import LoginPage from "./component/LoginPage/LoginPage";
import Header from "./component/Header/Header";
function App() {
  const [myCarList, setMyCarList] = useState([]);
  const [ratingCar, setRatingCar] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin"
            element={<RatingContainer ratingCar={ratingCar} />}
          />
          <Route
            path="/home"
            element={
              <Container
                myCarList={myCarList}
                handleRatingCar={handleRatingCar}
              />
            }
          />
          <Route
            path="/imageList"
            element={<ImageList onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );

  function handleAddToCart(car) {
    setMyCarList((prevList) => [...prevList, car]);
  }
  function handleRatingCar(carR) {
    setRatingCar((prevList) => [...prevList, carR]);
  }
}

export default App;
