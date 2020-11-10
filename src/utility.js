export function humanReadableTime(hoursAsDecimal) {
    let sign = (hoursAsDecimal >= 0) ? 1 : -1;
    hoursAsDecimal = hoursAsDecimal * sign;
    const hour = Math.floor(hoursAsDecimal);
    let decimalPart = hoursAsDecimal - hour;
    const min = 1 / 60;
    decimalPart = min * Math.round(decimalPart / min);
    let minute = Math.floor(decimalPart * 60) + '';

    if (minute.length < 2) {
        minute = '0' + minute;
    }
    sign = sign === 1 ? '' : '-';

    return sign + hour + ':' + minute;
}
