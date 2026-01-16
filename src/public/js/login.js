import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

console.log('🔥 login.js carregado');

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    const user = credential.user;

    // 🔐 GERA TOKEN
    const token = await user.getIdToken();

    // 💾 SALVA TOKEN
    localStorage.setItem('firebaseToken', token);

    console.log('✅ Login OK:', user.email);
    console.log('🔐 Token salvo no localStorage');

    // ➡️ REDIRECIONA
    window.location.href = 'index.html';

  } catch (error) {
    console.error('❌ Erro no login:', error.message);
    alert('Erro ao fazer login');
  }
});
