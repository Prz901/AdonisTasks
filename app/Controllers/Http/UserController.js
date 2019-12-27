'use strict';

const User = use('App/Models/User');

class UserController {
	async store({ request }) {
		const data = request.only(['username', 'email', 'password']);

		const user = await User.create(data);

		//Retorna sempre um json automaticamente porque o projeto foi criado usando apenas o Api Only,
		// se fosse um projeto sem Api Only teria que ser feito o tratamento desses dados que sao passados do controller usando por exemplo um toJSON()
		return user;
	}
}

module.exports = UserController;
