const creditCardNumber = document.getElementById("creditCardNumber");
const expirationDate = document.getElementById("expirationDate");
const cvv = document.getElementById("cvv");
const signature = document.getElementById("signature");
const cardholderName = document.getElementById("cardholderName");

cardholderName.addEventListener("input", function () {
  signature.textContent = this.value.toUpperCase();
});

creditCardNumber.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
});

expirationDate.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").replace(/(.{2})/, "$1/").trim();
});

cvv.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").replace(/(.{3})/, "$1 ").trim();
});

console.log("Credit Card Form Initialized");