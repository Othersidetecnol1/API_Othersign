import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

console.log('🔥 login.js carregado');

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login OK:', user.user.email);
    window.location.href = "index.html";
  } catch (error) {
    console.error('❌ Erro no login:', error.message);
    alert(error.message);
  }
});
