const userName = document.getElementById("userName");
const userPoints = document.getElementById("userPoints");

// Objeto
const user = {
  name: "Ubirajara",
  email: "Ubirajarapelli@gmail.com",
};

const userData = JSON.stringify(user); // Converte objeto para string

// Set - Grava um valor (chave, valor)
localStorage.setItem("user", userData);

// Get - Recupera um valor.   (chave)
const loggedUser = JSON.parse(localStorage.getItem("user")); // Converte string para objeto

userName.textContent = loggedUser.name;
userPoints.textContent = loggedUser.points;

// Remove - Remove um valor (chave)
localStorage.removeItem("user");

// Clear - Remove todos os valores
localStorage.clear();
