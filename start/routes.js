'use strict';

const Route = use('Route');

Route.post('Users', 'UserController.store').validator('User');

Route.post('Sessions', 'SessionController.store').validator('Session');

Route.post('Passwords', 'ForgotPasswordController.store').validator('ForgotPassword');
Route.put('Passwords', 'ForgotPasswordController.update').validator('ResetPassword');

Route.get('/files/:id', 'FileController.show');

Route.group(() => {
	Route.post('/files', 'FileController.store');

	Route.resource('projects', 'ProjectController')
		.apiOnly()
		.validator(new Map([[['projects.store'], ['Project']]]));

	Route.resource('projects.tasks', 'TaskController')
		.apiOnly()
		.validator(new Map([[['projects.tasks.store'], ['Task']]]));
}).middleware(['auth']);
