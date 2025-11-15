const addressDialog = document.querySelector(".address-dialog");
const closeButton = addressDialog.querySelector("#close-button");
const changeAddressButton = document.getElementById("change-address");

closeButton.addEventListener("click", function () {
  addressDialog.classList.toggle("open");
});

changeAddressButton.addEventListener("click", function () {
  addressDialog.classList.add("open");
});
