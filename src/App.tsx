import React from 'react';
import "./App.scss";
import CircleWithButtons from "./components/CircleWithButtons/CircleWithButtons";
import { Cards } from "./components/Cards/Cards";
import { Container } from "./components/Container/Container";
import { useState } from "react";
import { items } from "./data/data";
import "swiper/css";
import "swiper/css/pagination";


function App() {
  const [activeIndex, setActiveIndex] = useState(0); // Индекс активной кнопки

  return (
    <div>
    <Container>
      <div className="borderGradient">
        <h1 className="title">Исторические даты</h1>
      </div>

      <div className="App">
        <div className="lineY"></div>
        <div className="lineX"></div>

        <CircleWithButtons
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          items={items}
        />

        <Cards items={items[activeIndex].events} />
      </div>
    </Container>
    </div>
  );
}

export default App;
