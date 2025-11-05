// Importa tanto la configuración de Firebase como Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configura Firebase (reemplaza esto con tu configuración)
const firebaseConfig = {
  apiKey: "AIzaSyD4OefwlDIq7RQKw7gkjfRtadyBp_g5P0o",
  authDomain: "fraedzane.firebaseapp.com",
  projectId: "fraedzane",
  storageBucket: "fraedzane.firebasestorage.app",
  messagingSenderId: "596545109293",
  appId: "1:596545109293:web:2b11466e3b2203aeab67a4",
  measurementId: "G-X6V9JXRT3L"
};

// Inicializa Firebase
console.log('🔥 Iniciando Firebase...');
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase inicializado correctamente');

// Inicializa Firestore
console.log('📁 Conectando a Firestore...');
const db = getFirestore(app);
console.log('✅ Firestore conectado');

// Función para verificar si la colección existe y mostrar su contenido
async function verificarColeccion() {
  console.log('🔍 Verificando colección USUARIOS...');
  try {
    const querySnapshot = await getDocs(collection(db, "USUARIOS"));
    console.log(`📊 Total documentos en USUARIOS: ${querySnapshot.size}`);
    
    if (querySnapshot.empty) {
      console.log('❌ La colección está vacía');
    } else {
      console.log('📝 Documentos encontrados:');
      querySnapshot.forEach(doc => {
        const data = doc.data();
        // Mostramos solo el usuario para no exponer contraseñas en logs
        console.log(`   - ID: ${doc.id}, Usuario: ${data.USUARIO}`);
      });
    }
  } catch (error) {
    console.error('❌ Error al verificar colección:', error);
  }
}

// Función para listar todas las colecciones disponibles
async function listarColecciones() {
  try {
    console.log('📚 Listando todas las colecciones disponibles...');
    const collections = await getDocs(collection(db, '__DUMMY__')).catch(() => {});
    console.log('Colecciones encontradas:', collections);
  } catch (error) {
    console.log('Error al listar colecciones:', error);
  }
}

// Función para verificar credenciales en Firestore
export async function verificarCredenciales(usuario, contrasena) {
  console.log('🔐 Verificando credenciales para usuario:', usuario);
  
  try {
    console.log('📡 Verificando acceso a Firestore...');
    console.log('� Proyecto ID:', firebaseConfig.projectId);
    
    // Listar colecciones disponibles
    await listarColecciones();
    
    // Intentar acceder a la colección USUARIOS
    console.log('📚 Intentando acceder a colección USUARIOS...');
    const coleccionRef = collection(db, "USUARIOS");
    
    // Mostrar ruta completa de la colección
    console.log('📂 Ruta de colección:', coleccionRef.path);
    
    console.log('� Intentando leer documentos...');
    const snapshot = await getDocs(coleccionRef);
    console.log(`📊 Documentos en la colección: ${snapshot.size}`);
    
    if (snapshot.empty) {
      console.log('⚠️ La colección está vacía');
      console.log('💡 Verifica que:');
      console.log('1. La colección "USUARIOS" existe');
      console.log('2. Hay documentos en la colección');
      return false;
    }

    // Mostrar estructura de un documento para debug
    const primerDoc = snapshot.docs[0];
    console.log('📄 Estructura del primer documento:');
    console.log(JSON.stringify(primerDoc.data(), null, 2));
    
    // Crear una consulta a la colección USUARIOS
    console.log('🔍 Buscando coincidencias exactas...');
    const q = query(
      coleccionRef,
      where("USUARIO", "==", usuario),
      where("CONTRASENA", "==", contrasena)
    );

    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    // Mostrar resultado detallado
    const encontrado = !querySnapshot.empty;
    if (encontrado) {
      console.log('✅ Usuario y contraseña válidos');
      querySnapshot.forEach(doc => {
        console.log(`   - ID del documento: ${doc.id}`);
      });
    } else {
      console.log('❌ Credenciales incorrectas');
      // Verificar si el usuario existe pero la contraseña es incorrecta
      const userQuery = query(
        collection(db, "USUARIOS"),
        where("USUARIO", "==", usuario)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        console.log('   - El usuario existe pero la contraseña es incorrecta');
      } else {
        console.log('   - El usuario no existe en la base de datos');
      }
    }
    
    return encontrado;
  } catch (error) {
    console.error('❌ Error al verificar credenciales:', error);
    console.error('   Detalles:', error.message);
    throw error;
  }
}
