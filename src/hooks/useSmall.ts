import React from 'react';
import { useEffect, useState } from "react";

export const useSmall = () => {
  const [isSmall, setIsSmall] = useState(false);

  // Отслеживаем изменение ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 567);
    };

    // Устанавливаем текущее состояние при монтировании
    handleResize();

    // Добавляем слушатель на изменение размеров окна
    window.addEventListener('resize', handleResize);

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isSmall
};
