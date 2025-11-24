const modal = document.getElementById("success-modal");
const closeModalBtn = document.getElementById("close-modal");

function fecharModal() {
  if (modal) {
    modal.classList.remove("active");
    location.reload();
  }
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", fecharModal);
}

if (modal) {
  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      fecharModal();
    }
  });
}