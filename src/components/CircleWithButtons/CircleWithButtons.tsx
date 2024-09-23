import React from 'react';
import { useState } from "react";
import { gsap } from "gsap";
import BackButton from "../BackButton/BackButton";
import { Item } from "../../data/data";
import "./CircleStyles.scss";

interface Props {
  items: Item[];
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

const CircleWithButtons = ({ items, setActiveIndex, activeIndex }: Props) => {
  const radius = 268; 
  const centerX = 200; 
  const centerY = 200; 

  const [rotationAngle, setRotationAngle] = useState(0);
  const [displayedYear1, setDisplayedYear1] = useState(items[0].year1); 
  const [displayedYear2, setDisplayedYear2] = useState(items[0].year2);

  const totalItems = items.length;
  const angleStep = 360 / totalItems;

  const calculatePosition = (index: number) => {
    const angle = (index * angleStep - 45) * (Math.PI / 180); // Конвертация в радианы
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  const animateYearChange = (newYear1: number, newYear2: number) => {
    gsap.to(
      { value: displayedYear1 },
      {
        value: newYear1,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: function () {
          setDisplayedYear1(Math.round(this.targets()[0].value));
        },
      }
    );

    gsap.to(
      { value: displayedYear2 },
      {
        value: newYear2,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: function () {
          setDisplayedYear2(Math.round(this.targets()[0].value));
        },
      }
    );
  };

  const handleClick = (index: number) => {
    const targetRotation = -(index - activeIndex) * angleStep;

    gsap.to("#button-container", {
      rotation: targetRotation + rotationAngle,
      duration: 1,
      ease: "power2.inOut",
      transformOrigin: "center center",
    });

    gsap.to(".circleButton", {
      rotation: -(targetRotation + rotationAngle),
      duration: 1,
      ease: "power2.inOut",
      transformOrigin: "center center",
    });
    animateYearChange(items[index].year1, items[index].year2);
    setActiveIndex(index);
    setRotationAngle(targetRotation + rotationAngle);
  };

  return (
    <div>
      <div className="itemTitleWrapper">
        <span className="itemTitle">{items[activeIndex].info}</span>
      </div>

      <div className="content">
        <div className="circle"></div>

        <div id="button-container" className="button-container">
          {items.map((item, index) => {
            const { x, y } = calculatePosition(index);
            return (
              <div>
                <button
                  className={
                    "circleButton" +
                    " " +
                    (index === activeIndex ? "active" : "")
                  }
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${centerX + x}px`,
                    top: `${centerY + y}px`,
                  }}
                  onClick={() => handleClick(index)}
                  disabled={false}
                >
                  {index + 1}
                </button>
              </div>
            );
          })}
        </div>

        <div className="firstYear">{displayedYear1}</div>

        <div className="secondYear">{displayedYear2}</div>
      </div>
      <div className="buttonsBar">
        <span style={{ color: "rgb(66, 86, 122)" }}>
          {(activeIndex + 1).toString().padStart(2, "0")}/
          {items.length.toString().padStart(2, "0")}
        </span>
        <div className="navigation">
          <BackButton
            disabled={activeIndex === 0}
            onClick={() => {
              handleClick(activeIndex - 1);
            }}
          />
          <BackButton
            disabled={activeIndex === items.length - 1}
            reverse={true}
            onClick={() => handleClick(activeIndex + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default CircleWithButtons;
