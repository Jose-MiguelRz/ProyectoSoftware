import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-ulk4PmSicHnmXJ_YZI2qAP1s29xyBPU",
  authDomain: "udlap-practicas.firebaseapp.com",
  projectId: "udlap-practicas",
  storageBucket: "udlap-practicas.firebasestorage.app",
  messagingSenderId: "769842681195",
  appId: "1:769842681195:web:770b940555a006e473682e",
  measurementId: "G-D0V04H9M10"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
