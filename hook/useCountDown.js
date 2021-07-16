import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

const calcLeft = (t) => {
    if (!t) {
        return 0;
    }
    const left = dayjs(t).valueOf() - new Date().getTime();
    if (left < 0) {
        return 0;
    }
    return left;
};

const parseMs = (milliseconds) => {
    return {
        days: Math.floor(milliseconds / 86400000),
        hours: Math.floor(milliseconds / 3600000) % 24,
        minutes: Math.floor(milliseconds / 60000) % 60,
        seconds: Math.floor(milliseconds / 1000) % 60,
        milliseconds: Math.floor(milliseconds) % 1000,
    };
};

const useCountdown = (options) => {
    const { targetDate, interval = 1000, onEnd } = options || {};

    const [target, setTargetDate] = useState(targetDate);
    const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

    const onEndPersistFn = useCallback(() => {
        if (onEnd) {
            onEnd();
        }
    });

    useEffect(() => {
        if (!target) {
            // for stop
            setTimeLeft(0);
            return;
        }

        // 立即执行一次
        setTimeLeft(calcLeft(target));

        const timer = setInterval(() => {
            const targetLeft = calcLeft(target);
            setTimeLeft(targetLeft);
            if (targetLeft === 0) {
                clearInterval(timer);
                onEndPersistFn();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [target, interval]);

    const formattedRes = useMemo(() => {
        return parseMs(timeLeft);
    }, [timeLeft]);

    return [timeLeft, setTargetDate, formattedRes];
};

export default useCountdown;
