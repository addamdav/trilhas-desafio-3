// Seleciona o formulário
const formInscricao = document.getElementById('form-inscricao');

// Seleciona todos os campos que precisam de validação 'required' e email
const camposObrigatorios = formInscricao.querySelectorAll('[required]');
const campoEmail = formInscricao.querySelector('#email');
const campoSenha = formInscricao.querySelector('#senha');
const campoConfirmarSenha = formInscricao.querySelector('#confirmar-senha');
const campoIdUsuario = formInscricao.querySelector('#id-usuario'); // Seleciona o novo campo

// Função para mostrar erro
function mostrarErro(campo, mensagem) {
  const spanErro = document.getElementById(`erro-${campo.id}`);
  if (spanErro) {
    spanErro.textContent = mensagem;
    campo.classList.add('invalido'); // Adiciona classe para feedback visual (opcional)
  }
}

// Função para limpar erros
function limparErros() {
  const mensagensErro = formInscricao.querySelectorAll('.mensagem-erro');
  mensagensErro.forEach(span => span.textContent = '');
  
  const camposInvalidos = formInscricao.querySelectorAll('.invalido');
  camposInvalidos.forEach(campo => campo.classList.remove('invalido'));
}

// Função para validar e-mail (formato simples)
function validarEmail(email) {
  // Regex simples para verificar se parece um email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

// Função principal de validação
function validarFormulario() {
  limparErros(); // Limpa erros anteriores
  let ehValido = true;
  
  // 1. Verifica campos obrigatórios
  camposObrigatorios.forEach(campo => {
    if (!campo.value.trim()) {
      mostrarErro(campo, 'Este campo é obrigatório.');
      ehValido = false;
    }
  });
  
  // 2. Verifica formato do e-mail (apenas se já não estiver vazio)
  if (campoEmail.value.trim() && !validarEmail(campoEmail.value)) {
    mostrarErro(campoEmail, 'Por favor, insira um e-mail válido (ex: nome@dominio.com).');
    ehValido = false;
  }
  
  // 3. Verifica se as senhas coincidem (apenas se ambas não estiverem vazias)
  if (campoSenha.value.trim() && campoConfirmarSenha.value.trim()) {
    if (campoSenha.value !== campoConfirmarSenha.value) {
      mostrarErro(campoConfirmarSenha, 'As senhas não coincidem.');
      // mostrarErro(campoSenha, 'As senhas não coincidem.');
      ehValido = false;
    }
    // Verificar comprimento mínimo da senha
    else if (campoSenha.value.length < 8) {
      mostrarErro(campoSenha, 'A senha deve ter no mínimo 8 caracteres.');
      ehValido = false;
    }
  }
  
  // 4. Verifica se o ID de Usuário já existe no LocalStorage (se não estiver vazio)
  if (campoIdUsuario.value.trim()) {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuariosTrilhas')) || {};
    if (usuariosSalvos[campoIdUsuario.value]) {
      mostrarErro(campoIdUsuario, 'Este ID de usuário já está em uso. Escolha outro.');
      ehValido = false;
    }
  }
  
  // Exemplo simples (não valida dígitos verificadores, apenas se parece com formato):
  const campoCpf = formInscricao.querySelector('#cpf');
  if (campoCpf.value.trim() && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(campoCpf.value)) {
    //mostrarErro(campoCpf, 'Formato de CPF inválido (use 000.000.000-00).');
    //ehValido = false; // Descomente para ativar essa validação mais rigorosa
  }
  
  return ehValido;
}

// Função para salvar os dados no LocalStorage
function salvarDados() {
  // Pega os dados relevantes (ID do usuário e senha)
  const idUsuario = campoIdUsuario.value.trim();
  const senha = campoSenha.value; // Não usar trim() na senha
  
  // Recupera os usuários já salvos ou cria um objeto vazio
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuariosTrilhas')) || {};
  
  // Adiciona o novo usuário (ID como chave, senha como valor)
  usuariosSalvos[idUsuario] = { senha: senha };
  
  // Salva o objeto atualizado de volta no LocalStorage
  localStorage.setItem('usuariosTrilhas', JSON.stringify(usuariosSalvos));
  
  // Exibe a mensagem de sucesso
  alert('Inscrição realizada com sucesso! Seus dados foram salvos.');
  
  // Opcional: Limpar o formulário após salvar
  formInscricao.reset();
  limparErros();
  
  window.location.href = 'login.html';
}

formInscricao.addEventListener('submit', function(evento) {
  // Previne o comportamento padrão de envio do formulário (que recarregaria a página)
  evento.preventDefault();
  
  // Chama a função de validação
  const formularioValido = validarFormulario();
  
  // Se o formulário for válido, salva os dados
  if (formularioValido) {
    console.log("Formulário válido. Salvando dados...");
    salvarDados();
  } else {
    console.log("Formulário inválido. Verifique os erros.");
    // Foca no primeiro campo com erro para melhorar a usabilidade
    const primeiroErro = formInscricao.querySelector('.invalido');
    if(primeiroErro) {
      primeiroErro.focus();
    }
  }
});

// Adiciona listeners 'input' para limpar erro enquanto digita (melhora UX)
camposObrigatorios.forEach(campo => {
  campo.addEventListener('input', () => {
    // Se o campo tinha um erro e agora tem valor, limpa o erro específico
    if (campo.classList.contains('invalido') && campo.value.trim()) {
      const spanErro = document.getElementById(`erro-${campo.id}`);
      if (spanErro) {
        spanErro.textContent = '';
      }
      campo.classList.remove('invalido');
      
      // Revalida senhas se uma delas for alterada
      if (campo.id === 'senha' || campo.id === 'confirmar-senha') {
        if (campoSenha.value.trim() && campoConfirmarSenha.value.trim()) {
          const spanErroConfirmar = document.getElementById('erro-confirmar-senha');
          if (campoSenha.value === campoConfirmarSenha.value) {
            if (spanErroConfirmar && spanErroConfirmar.textContent === 'As senhas não coincidem.') {
              spanErroConfirmar.textContent = '';
              campoConfirmarSenha.classList.remove('invalido');
            }
            // Limpa erro de comprimento se a senha agora for válida
            if (campo.id === 'senha' && campoSenha.value.length >= 8) {
              const spanErroSenha = document.getElementById('erro-senha');
              if (spanErroSenha && spanErroSenha.textContent.includes('mínimo 8 caracteres')) {
                spanErroSenha.textContent = '';
                campoSenha.classList.remove('invalido');
              }
            }
          }
        }
      }
      // Revalida email se ele for alterado
      if(campo.id === 'email') {
        if(validarEmail(campo.value)) {
          const spanErroEmail = document.getElementById('erro-email');
          if (spanErroEmail && spanErroEmail.textContent.includes('e-mail válido')) {
            spanErroEmail.textContent = '';
            campo.classList.remove('invalido');
          }
        }
      }
      // Revalida ID do usuário se ele for alterado
      if(campo.id === 'id-usuario') {
        const usuariosSalvos = JSON.parse(localStorage.getItem('usuariosTrilhas')) || {};
        if (!usuariosSalvos[campo.value.trim()]) {
          const spanErroId = document.getElementById('erro-id-usuario');
          if (spanErroId && spanErroId.textContent.includes('já está em uso')) {
            spanErroId.textContent = '';
            campo.classList.remove('invalido');
          }
        }
      }
    }
  });
});