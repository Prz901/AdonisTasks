'use strict';

class SessionController {
	async store({ request, response, auth }) {
		//Desestrutura o email e senha que vem da requisição
		const { email, password } = request.all();

		//autentica o usuario usando o token JWT
		const token = await auth.attempt(email, password);

		return token;
	}
}

module.exports = SessionController;
