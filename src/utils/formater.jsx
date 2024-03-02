function formatDateString(date) {
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateToInput(date) {
    const isoDateString = date.toISOString();

    const datePart = isoDateString.slice(0, 10);
    const timePart = isoDateString.slice(11, 16);

    return `${datePart}T${timePart}`;
}

export { formatDateString, formatDateToInput };
