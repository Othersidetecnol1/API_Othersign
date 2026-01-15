import { initializeApp } from
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import { getAuth } from
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyB8YPnfRa1oZgKuQThRc1p_ll-Yx-D15Tw",
  authDomain: "dashboardotherside.firebaseapp.com",
  projectId: "dashboardotherside",
  storageBucket: "dashboardotherside.firebasestorage.app",
  messagingSenderId: "21361342786",
  appId: "1:21361342786:web:878f789c3c1e4d720f70db"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
