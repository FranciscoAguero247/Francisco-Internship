import React, { useEffect, useState } from "react";

    
const CountDownTimer = ({expiryDate}) => {
    const[timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
    const calculateTime = () => {
        const currentTime = new Date().getTime();
        const timeDifference = expiryDate - currentTime;

        if (timeDifference <= 0) {
        setTimeLeft("Expired");
        return;
        }

        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
    }, [expiryDate]);

    return <div className="de_countdown">{timeLeft}</div>;
};


export default CountDownTimer;
