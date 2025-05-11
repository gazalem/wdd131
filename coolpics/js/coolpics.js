const currentDate = new Date();
const yearPart = currentDate.getFullYear();
const currentYear = document.querySelector("#currentYear");
currentYear.innerHTML = yearPart;