'use strict';

const Mail = use('Mail');
const Helpers = use('Helpers');
const TaskHook = (exports = module.exports = {});

//So executa o Hook quando ele cria uma task com user_id ou quando ele atualiza uma task com user_id

TaskHook.sendNewTaskMail = async taskInstance => {
	//.dirty grava quais foram as novas informações gravas dentro do Model
	if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
		return;
	}
	const { email, username } = await taskInstance.user().fetch();

	const file = await taskInstance.file().fetch();

	const { title } = taskInstance;

	await Mail.send(['email.new_task'], { username, title, hasAttachment: !!file }, message => {
		message
			.to(email)
			.from('oscar@mudisaude.com.br', 'Oscar | Mudi saude')
			.subject('Nova tarefa adicionada para voce');

		if (file) {
			message.attach(Helpers.tmpPath(`uploads/${file.file}`, { filename: file.name }));
		}
	});
};
