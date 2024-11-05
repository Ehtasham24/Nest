// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBhkWcDyqaukxFaqhfc2Rju6Ds-opTlt6U',
  authDomain: 'test-6ec33.firebaseapp.com',
  projectId: 'test-6ec33',
  storageBucket: 'test-6ec33.appspot.com',
  messagingSenderId: '441957267150',
  appId: '1:441957267150:web:9034cbf96b341b067b029f',
  measurementId: 'G-1YQSV76TP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
