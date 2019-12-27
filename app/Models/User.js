'use strict';

const Model = use('Model');

const Hash = use('Hash');

class User extends Model {
	//static boot () é como se fosse o constructor da classe
	static boot() {
		super.boot();

		//adiciona um hook( Função que e executada automaticamente antes de salvar um novo usuario,
		//criptografa a senha do usuario quando ele cria ou muda a senha)
		this.addHook('beforeSave', async userInstance => {
			if (userInstance.dirty.password) {
				userInstance.password = await Hash.make(userInstance.password);
			}
		});
	}

	tokens() {
		return this.hasMany('App/Models/Token');
	}

	projects() {
		return this.hasMany('App/Models/Project');
	}

	tasks() {
		return this.hasMany('App/Models/Task');
	}
}

module.exports = User;
