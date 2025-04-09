// Seleciona o formulário de login
const formLogin = document.getElementById('form-login');

// Seleciona os campos e spans de erro
const campoIdUsuarioLogin = document.getElementById('login-id-usuario');
const campoSenhaLogin = document.getElementById('login-senha');
const erroIdUsuarioLogin = document.getElementById('erro-login-id-usuario');
const erroSenhaLogin = document.getElementById('erro-login-senha');
const erroGeralLogin = document.getElementById('erro-login-geral');

// Função para limpar erros do formulário de login
function limparErrosLogin() {
  erroIdUsuarioLogin.textContent = '';
  erroSenhaLogin.textContent = '';
  erroGeralLogin.textContent = '';
  campoIdUsuarioLogin.classList.remove('invalido');
  campoSenhaLogin.classList.remove('invalido');
}

// Função para autenticar o usuário
function autenticarUsuario(idUsuario, senha) {
  // Recupera os dados salvos no LocalStorage
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuariosTrilhas')) || {};
  
  // Verifica se o ID do usuário existe
  const usuarioEncontrado = usuariosSalvos[idUsuario];
  
  if (usuarioEncontrado) {
    // Verifica se a senha corresponde
    if (usuarioEncontrado.senha === senha) {
      return true; // Autenticação bem-sucedida
    }
  }
  
  return false; // Falha na autenticação (ID não encontrado ou senha incorreta)
}

// Adiciona o listener para o evento 'submit' do formulário de login
formLogin.addEventListener('submit', function(evento) {
  evento.preventDefault(); // Previne o envio padrão
  limparErrosLogin();
  
  const idUsuario = campoIdUsuarioLogin.value.trim();
  const senha = campoSenhaLogin.value; // Senha não deve ter trim()
  
  let ehValido = true;
  
  // Validação básica: campos não podem estar vazios
  if (!idUsuario) {
    erroIdUsuarioLogin.textContent = 'Por favor, digite seu ID de usuário.';
    campoIdUsuarioLogin.classList.add('invalido');
    ehValido = false;
  }
  if (!senha) {
    erroSenhaLogin.textContent = 'Por favor, digite sua senha.';
    campoSenhaLogin.classList.add('invalido');
    ehValido = false;
  }
  
  // Se a validação básica passou, tenta autenticar
  if (ehValido) {
    if (autenticarUsuario(idUsuario, senha)) {
      alert(`Login bem-sucedido! Bem-vindo(a), ${idUsuario}!`);
      formLogin.reset(); // Limpa o formulário
    } else {
      // Mostra um erro geral se a autenticação falhar
      erroGeralLogin.textContent = 'ID de usuário ou senha inválidos.';
      campoIdUsuarioLogin.classList.add('invalido'); // Marca ambos como inválidos visualmente
      campoSenhaLogin.classList.add('invalido');
    }
  }
});

// Limpa erro ao digitar
campoIdUsuarioLogin.addEventListener('input', () => {
  if (campoIdUsuarioLogin.classList.contains('invalido')) {
    erroIdUsuarioLogin.textContent = '';
    campoIdUsuarioLogin.classList.remove('invalido');
    erroGeralLogin.textContent = ''; // Limpa erro geral também
  }
});
campoSenhaLogin.addEventListener('input', () => {
  if (campoSenhaLogin.classList.contains('invalido')) {
    erroSenhaLogin.textContent = '';
    campoSenhaLogin.classList.remove('invalido');
    erroGeralLogin.textContent = ''; // Limpa erro geral também
  }
});