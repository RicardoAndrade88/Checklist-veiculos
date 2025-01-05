// ==========================
// Importações e Configuração do Firebase
// ==========================
import { 
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import app from "./firebase-config.js";

const auth = getAuth(app);

// ==========================
// Funções de Autenticação
// ==========================

// Função de login
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login realizado com sucesso!", userCredential.user);
    alert("Login realizado com sucesso!");
    window.location.href = "vehicles.html"; // Redireciona para a página de veículos
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    alert("Erro ao fazer login: " + error.message);
  }
}

// Função de registro
async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário registrado com sucesso!", userCredential.user);
    alert("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    alert("Erro ao registrar usuário: " + error.message);
  }
}

// Manipulação de login e registro
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await login(email, password);
});

document.getElementById("signupLink")?.addEventListener("click", async () => {
  const email = prompt("Digite seu e-mail:");
  const password = prompt("Digite sua senha:");
  await register(email, password);
});

// ==========================
// Funções de Veículos
// ==========================
function loadVehicles() {
  db.collection("veiculos").get()
    .then((snapshot) => {
      const vehiclesList = document.getElementById("vehiclesList");
      snapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = `${doc.data().placa} - ${doc.data().modelo}`;
        li.addEventListener("click", () => {
          window.location.href = `checklist.html?vehicleId=${doc.id}`;
        });
        vehiclesList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar veículos:", error);
    });
}

// Carrega os veículos na página de veículos
if (window.location.pathname.endsWith("vehicles.html")) {
  loadVehicles();
}

// ==========================
// Funções de Checklist
// ==========================
document.getElementById("checklistForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const vehicleId = params.get("vehicleId");

  const checklistData = {
    vehicleId,
    fuelLevel: document.getElementById("fuelLevel").value,
    oilLevel: document.getElementById("oilLevel").value,
    tireCondition: document.getElementById("tireCondition").value,
    odometer: document.getElementById("odometer").value,
    timestamp: new Date(),
  };

  db.collection("checklists").add(checklistData)
    .then(() => {
      alert("Checklist salvo com sucesso!");
      window.location.href = "vehicles.html";
    })
    .catch((error) => {
      console.error("Erro ao salvar checklist:", error);
      alert("Erro ao salvar checklist.");
    });
});

// ==========================
// Funções de Histórico
// ==========================
function loadHistory() {
  db.collection("checklists").orderBy("timestamp", "desc").get()
    .then((snapshot) => {
      const historyList = document.getElementById("historyList");
      snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `
          Veículo: ${data.vehicleId} | 
          Combustível: ${data.fuelLevel} | 
          Óleo: ${data.oilLevel} | 
          Pneus: ${data.tireCondition} | 
          KM: ${data.odometer} | 
          Data: ${new Date(data.timestamp.seconds * 1000).toLocaleString()}
        `;
        historyList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar histórico:", error);
    });
}

// Carrega o histórico de checklists na página de histórico
if (window.location.pathname.endsWith("history.html")) {
  loadHistory();
}

// ==========================
// Validação de Formulário de Contato
// ==========================
const formContato = document.getElementById('formContato');

formContato?.addEventListener('submit', function (event) {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    event.preventDefault();
  } else {
    alert("Mensagem enviada com sucesso!");
  }
});

// ==========================
// Scroll Suave
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// ==========================
// Redirecionamento após Login
// ==========================
window.location.href = "principal.html"; // Substitua "principal.html" pelo arquivo desejado após o login
