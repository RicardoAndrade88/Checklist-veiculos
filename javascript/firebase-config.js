// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAvj7d4LNWz13RPyzQefSDZJuTkPAYh3PM",
    authDomain: "checklistveiculos-d6265.firebaseapp.com",
    projectId: "checklistveiculos-d6265",
    storageBucket: "checklistveiculos-d6265.firebasestorage.app",
    messagingSenderId: "58851774099",
    appId: "1:58851774099:web:98eafa9171ecd619610766"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore e Auth (pode ser necessário se estiver usando esses serviços)
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta o app, db e auth para serem usados em outros arquivos
export { app, db, auth, collection, getDocs };
