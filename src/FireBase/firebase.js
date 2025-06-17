import  {initializeApp} from 'firebase/app'
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCoq6xykXLg8LtK1p0KDMbBUIo8zFQzZaQ",
  authDomain: "ai-reactara.firebaseapp.com",
  projectId: "ai-reactara",
  storageBucket: "ai-reactara.firebasestorage.app",
  messagingSenderId: "109115536810",
  appId: "1:109115536810:web:a8e03cc27ceaa6d4e527d3",
  measurementId: "G-9HD197BF1Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
