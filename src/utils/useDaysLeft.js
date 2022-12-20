import { useState, useEffect } from 'react';

const useDaysLeft = (time) => {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        // Calculate the difference in seconds
        const currentTimestamp = Date.now() / 1000;
        const difference = time / 1000 - currentTimestamp;

        // Convert the difference to days and update the value of `daysLeft`
        setDaysLeft(Math.ceil(difference / 86400));
    }, [time]);

    return daysLeft;
};

export default useDaysLeft;