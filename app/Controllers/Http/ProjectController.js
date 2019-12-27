'use strict';

const Project = use('App/Models/Project');

class ProjectController {
	async index({ request }) {
		const { page } = request.get();

		const projects = await Project.query()
			.with('user')
			.paginate(page);
		// .fetch();
		//Metodo para fazer paginação no adonis(.paginate(numero da pagina que vai estar a paginação))

		return projects;
	}
	async store({ request, auth }) {
		const data = request.only(['title', 'description']);

		const project = await Project.create({ ...data, user_id: auth.user.id });

		return project;
	}

	async show({ params }) {
		const project = await Project.findOrFail(params.id);

		//esse metodo load é igual o .with() porem o .with() nao pode ser usado aqui porque é para apenas um project nao para varios como no de cima
		await project.load('user');
		await project.load('tasks');

		return project;
	}

	async update({ params, request }) {
		const project = await Project.findOrFail(params.id);
		const data = request.only(['title', 'description']);

		project.merge(data);

		await project.save();

		return project;
	}

	async destroy({ params }) {
		const project = await Project.findOrFail(params.id);

		await project.delete();
	}
}

module.exports = ProjectController;
