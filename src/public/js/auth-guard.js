console.log('🛡️ auth-guard carregado');

const token = localStorage.getItem('firebaseToken');

if (!token) {
  console.warn('❌ Token não encontrado, redirecionando para login');
  window.location.href = '/login.html';
} else {
  console.log('✅ Token encontrado, acesso permitido');
}
