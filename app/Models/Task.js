'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Task extends Model {
	// Aqui vai entrar o hook criado de task

	//Definição de Hook pelo site do adonis : "Hooks are the actions you perform before or after a specified database operation"

	static boot() {
		super.boot();

		this.addHook('afterCreate', 'TaskHook.sendNewTaskMail');
		this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail');
	}

	project() {
		return this.belongsTo('App/Models/Project');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	file() {
		return this.belongsTo('App/Models/File');
	}
}

module.exports = Task;
