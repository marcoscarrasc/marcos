import React, { useState, useEffect } from "react";

const DateTime: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const currentDate = currentDateTime.toLocaleDateString();
  const currentTime = currentDateTime.toLocaleTimeString();
  return (
    <div>
      <p>Fecha y Hora Actual: {currentDate.toLocaleString()}</p>
      <p>Hora Actual: {currentTime}</p>
    </div>
  );
};

export default DateTime;
