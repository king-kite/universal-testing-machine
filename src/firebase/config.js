import { initializeApp } from 'firebase/app';
// import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { connectStorageEmulator, getStorage } from 'firebase/storage';

const USE_FIREBASE_EMULATOR = import.meta.env.VITE_USE_FIREBASE_EMULATOR
	? +import.meta.env.VITE_USE_FIREBASE_EMULATOR === 1
	: false;

// Your web app's Firebase configuration
const config = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(config);

// export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
// export const storage = getStorage(app);

if (USE_FIREBASE_EMULATOR) {
	// const authUrl = `http://localhost:${
	//   import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT
	// }`;
	const databasePort = import.meta.env.VITE_FIREBASE_DATABASE_EMULATOR_PORT;
	const firestorePort = import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT;
	// const storagePort = import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_PORT;

	// connectAuthEmulator(auth, authUrl, { disableWarnings: true });
	connectDatabaseEmulator(db, 'localhost', +databasePort);
	connectFirestoreEmulator(firestore, 'localhost', +firestorePort);
	// connectStorageEmulator(storage, 'localhost', +storagePort);
}

// # Firebase Development
// VITE_USE_FIREBASE_EMULATOR=1

// # Firebase API Keys
// VITE_FIREBASE_API_KEY=a-universal-testing-machine
// VITE_FIREBASE_AUTH_DOMAIN=http://127.0.0.1:9099
// VITE_FIREBASE_DATABASE_URL=http://127.0.0.1:9000/?ns=a-universal-testing-machine
// VITE_FIREBASE_PROJECT_ID=a-universal-testing-machine
// VITE_FIREBASE_STORAGE_BUCKET=a-universal-testing-machine.appspot.com
// VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
// VITE_FIREBASE_APP_ID=a-universal-testing-machine-app-id

// # Firebase Emulator Ports
// VITE_FIREBASE_AUTH_EMULATOR_PORT=9099
// VITE_FIREBASE_DATABASE_EMULATOR_PORT=9000
// VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8080
// VITE_FIREBASE_STORAGE_EMULATOR_PORT=9199

// # # Firebase Production
// # VITE_USE_FIREBASE_EMULATOR=0

// # # Firebase API Keys
// # VITE_FIREBASE_API_KEY=AIzaSyBmMhuNz5Ks0PBU3Y8QWmY9HETkSTAmBUY
// # VITE_FIREBASE_AUTH_DOMAIN=a-universal-testing-machine.firebaseapp.com
// # VITE_FIREBASE_DATABASE_URL=https://a-universal-testing-machine-default-rtdb.firebaseio.com
// # VITE_FIREBASE_PROJECT_ID=a-universal-testing-machine
// # VITE_FIREBASE_STORAGE_BUCKET=a-universal-testing-machine.appspot.com
// # VITE_FIREBASE_MESSAGING_SENDER_ID=410984561066
// # VITE_FIREBASE_APP_ID=1:410984561066:web:feb487cbf37f43933ed3d3
// # VITE_FIREBASE_MEASUREMENT_ID=G-Y6QGVYVN2R
