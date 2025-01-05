// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvj7d4LNWz13RPyzQefSDZJuTkPAYh3PM",
  authDomain: "checklistveiculos-d6265.firebaseapp.com",
  projectId: "checklistveiculos-d6265",
  storageBucket: "checklistveiculos-d6265.firebasestorage.app",
  messagingSenderId: "58851774099",
  appId: "1:58851774099:web:98eafa9171ecd619610766"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Login Functionality

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "vehicles.html"; // Redirect to vehicles page
      })
      .catch((error) => {
        alert("Erro ao fazer login: " + error.message);
      });
});

// Signup Link

document.getElementById("signupLink").addEventListener("click", () => {
    const email = prompt("Digite seu e-mail:");
    const password = prompt("Digite sua senha:");

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Usuário cadastrado com sucesso");
      })
      .catch((error) => {
        alert("Erro ao cadastrar: " + error.message);
      });
});



// Load Vehicles
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
        console.error("Erro ao carregar veículos: ", error);
      });
  }
  
  // Logout Functionality
  function logout() {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  }
  
  if (window.location.pathname.endsWith("vehicles.html")) {
    loadVehicles();
  }


// Save Checklist
document.getElementById("checklistForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams(window.location.search);
    const vehicleId = params.get("vehicleId");
  
    const checklistData = {
      vehicleId: vehicleId,
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
        console.error("Erro ao salvar checklist: ", error);
        alert("Erro ao salvar checklist.");
      });
  });
  
  // Go Back
  function goBack() {
    window.history.back();
  }
  

// Load History
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
        console.error("Erro ao carregar histórico: ", error);
      });
  }
  
  if (window.location.pathname.endsWith("history.html")) {
    loadHistory();
  }
