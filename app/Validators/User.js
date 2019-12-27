'use strict';

const Antl = use('Antl');

class User {
	//Por padrao o Adonis verifica o campo um por vez e mostra apenas a mensagem de erro unica.
	//Usando o ValidateAll mostra todos os erros de validação na mesma mensagem
	get validateAll() {
		return true;
	}

	//regras que vao ser impostas sobre os  campos que temos na requisição
	get rules() {
		return {
			username: 'required|unique:users',
			email: 'required|email|unique:users',
			password: 'required|confirmed'
		};
	}
	get messages() {
		return Antl.list('validation');
	}
}

module.exports = User;
