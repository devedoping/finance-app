import jalaali from "jalaali-js";
import {MONTH_NAMES} from "@/lib/consts";

export const getJalaliMonthRange = (year, month) => {
    const { gy: startGy, gm: startGm, gd: startGd } = jalaali.toGregorian(year, month, 1);
    const daysInMonth = jalaali.jalaaliMonthLength(year, month);
    const { gy: endGy, gm: endGm, gd: endGd } = jalaali.toGregorian(year, month, daysInMonth);

    const startDate = new Date(startGy, startGm - 1, startGd);
    const endDate = new Date(endGy, endGm - 1, endGd, 23,59,59,999);

    return {
        startDate,
        endDate,
    }
}

export const getCurrentJalaliMonthRange = () => {
    const now = new Date();
    const j = jalaali.toJalaali(now);

    const start = jalaali.toGregorian(j.jy, j.jm, 1);
    const startDate = new Date(start.gy, start.gm - 1, start.gd);

    const end = jalaali.toGregorian(j.jy, j.jm, 31);
    const endDate = new Date(end.gy, end.gm - 1, end.gd);

    return { startDate, endDate };
}

export const getMonthName = (monthNumber) => {
    return MONTH_NAMES[monthNumber - 1];
}