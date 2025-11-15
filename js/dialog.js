const menuLateralPosition= document.querySelector(".menu-lateral-position");
const closeButton = menuLateralPosition.querySelector("#close-button");
const changeAddressButton = document.getElementById("menu-lateral");

closeButton.addEventListener("click", function () {
  menuLateralPosition.classList.toggle("open");
});

changeAddressButton.addEventListener("click", function () {
  menuLateralPosition.classList.add("open");
});
