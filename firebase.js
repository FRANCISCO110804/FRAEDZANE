// Importar Firebase v9+
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Configuración de Firebase (la que me pasaste)
const firebaseConfig = {
  apiKey: "AIzaSyD4OefwlDIq7RQKw7gkjfRtadyBp_g5P0o",
  authDomain: "fraedzane.firebaseapp.com",
  projectId: "fraedzane",
  storageBucket: "fraedzane.firebasestorage.app",
  messagingSenderId: "596545109293",
  appId: "1:596545109293:web:2b11466e3b2203aeab67a4",
  measurementId: "G-X6V9JXRT3L"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
