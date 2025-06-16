function validateAdopterData(data) {
  const errors = {};
  const cpfLimpo = data.cpf.replace(/[^\d]/g, '');

  console.log("CPF original:", data.cpf);
  console.log("CPF limpo:", cpfLimpo);

  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Nome é obrigatório e deve ser uma string.';
  }

  if (!data.surname || typeof data.surname !== 'string') {
    errors.surname = 'Sobrenome é obrigatório e deve ser uma string.';
  }

  if (!cpfLimpo || !/^\d{11}$/.test(cpfLimpo)) {
    errors.cpf = 'CPF deve conter 11 dígitos numéricos.';
  }

  if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = 'Email inválido.';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'Senha deve conter no mínimo 8 caracteres.';
  }

  if (!data.phone || !/^\d{10,11}$/.test(data.phone)) {
    errors.phone = 'Telefone inválido.';
  }

  if (!data.birthday || isNaN(Date.parse(data.birthday))) {
    errors.birthday = 'Data de nascimento inválida.';
  }

  return errors;
}

module.exports = { validateAdopterData };
