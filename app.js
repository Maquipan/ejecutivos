// --- app.js CONECTADO A FIREBASE ---

// Tu configuración personal para conectar con tu proyecto en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9tUGGmMqk85Hljw8H1XoTfX2U5iQu85c",
  authDomain: "control-de-servicios-b8e34.firebaseapp.com",
  projectId: "control-de-servicios-b8e34",
  storageBucket: "control-de-servicios-b8e34.firebasestorage.app",
  messagingSenderId: "28935045448",
  appId: "1:28935045448:web:cf61d09b606951f000b37d",
  measurementId: "G-FSCT1H3VJJ"
};

// Inicializar la aplicación de Firebase
firebase.initializeApp(firebaseConfig);
// Crear una referencia a la base de datos de Firestore
const db = firebase.firestore();

/**
 * Obtiene todos los servicios desde la base de datos de Firebase.
 * Es una función 'async' porque la consulta a internet toma tiempo.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de servicios.
 */
async function obtenerServicios() {
    const snapshot = await db.collection('servicios').get();
    const servicios = [];
    snapshot.forEach(doc => {
        // Combina el ID del documento con el resto de los datos
        servicios.push({ id: doc.id, ...doc.data() });
    });
    return servicios;
}

/**
 * Guarda un nuevo servicio en Firebase.
 * @param {Object} nuevoServicio - El objeto del servicio a crear.
 */
async function crearServicio(nuevoServicio) {
    // Ya no usamos un ID local, Firestore genera uno único.
    // Quitamos la propiedad 'id' local si existe.
    delete nuevoServicio.id; 
    await db.collection('servicios').add(nuevoServicio);
}

/**
 * Actualiza un servicio existente en Firebase.
 * @param {string} id - El ID del documento en Firebase.
 * @param {Object} datosActualizados - Un objeto con los campos a actualizar.
 */
async function actualizarServicio(id, datosActualizados) {
    await db.collection('servicios').doc(id).update(datosActualizados);
}

/**
 * Elimina un servicio de Firebase.
 * @param {string} id - El ID del documento en Firebase.
 */
async function eliminarServicio(id) {
    await db.collection('servicios').doc(id).delete();
}