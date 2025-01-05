// ==========================
// Importações e Configuração do Firebase
// ==========================
import { 
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { app, db, auth } from './firebase-config.js';

// ==========================
// Funções de Autenticação
// ==========================
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login realizado com sucesso!", userCredential.user);
    alert("Login realizado com sucesso!");
    window.location.href = "principal.html"; // Redireciona após o login bem-sucedido
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    alert("Erro ao fazer login: " + error.message);
  }
}

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
async function loadVehicles() {
  try {
    const vehiclesRef = collection(db, "veiculos");
    const snapshot = await getDocs(vehiclesRef);
    const vehiclesList = document.getElementById("vehiclesList");

    snapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = `${doc.data().placa} - ${doc.data().modelo}`;
      li.addEventListener("click", () => {
        window.location.href = `checklist.html?vehicleId=${doc.id}`;
      });
      vehiclesList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar veículos:", error);
  }
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

  addDoc(collection(db, "checklists"), checklistData)
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
async function loadHistory() {
  try {
    const checklistsRef = collection(db, "checklists");
    const snapshot = await getDocs(checklistsRef);
    const historyList = document.getElementById("historyList");

    snapshot.forEach((doc) => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `Veículo: ${data.vehicleId} | Combustível: ${data.fuelLevel} | Óleo: ${data.oilLevel} | Pneus: ${data.tireCondition} | KM: ${data.odometer} | Data: ${new Date(data.timestamp.seconds * 1000).toLocaleString()}`;
      historyList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
}

// ==========================
// Função de Alteração Dinâmica de Conteúdo
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const pageTitle = document.getElementById("pageTitle");
  const dynamicContent = document.getElementById("dynamicContent");

  const path = window.location.pathname;

  if (path.includes("vehicles.html")) {
    pageTitle.textContent = "Veículos";
    dynamicContent.innerHTML = "<p>Aqui estão os veículos...</p>";
    loadVehicles(); // Carrega os veículos
  } else if (path.includes("checklist.html")) {
    pageTitle.textContent = "Checklist de Inspeção";
    dynamicContent.innerHTML = "<p>Preencha o checklist para o veículo...</p>";
  } else if (path.includes("history.html")) {
    pageTitle.textContent = "Histórico de Checklists";
    dynamicContent.innerHTML = "<p>Veja o histórico dos checklists realizados...</p>";
    loadHistory(); // Carrega o histórico
  } else {
    pageTitle.textContent = "Bem-vindo ao Sistema de Checklist";
    dynamicContent.innerHTML = "<p>Selecione uma opção no menu para começar.</p>";
  }

  document.addEventListener('DOMContentLoaded', function () {
    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) {
      pageTitle.textContent = "Cadastro de Usuário";  // Título que você deseja exibir
    }
  
    // Outras ações do script podem ser colocadas aqui, se necessário.
  });
  
});
