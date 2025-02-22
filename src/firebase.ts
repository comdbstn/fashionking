import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDkIA24oN5Y8gNfTD2_qcKTfnTzJo8uk24",
  authDomain: "zzol-cfbe3.firebaseapp.com",
  projectId: "zzol-cfbe3",
  storageBucket: "zzol-cfbe3.firebasestorage.app",
  messagingSenderId: "10483295010",
  appId: "1:10483295010:web:0ebb8731e612a6b40efb7b",
  measurementId: "G-Y7RJVDL4NV"
};

// Firebase 초기화
let app: FirebaseApp;
let db: Firestore;
let analytics: Analytics;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error('Firebase 초기화 오류:', error);
}

export { db, analytics }; 