const Router = require('koa-router');
const router = new Router();

const Task = require('../api/task');

router.post('/task', async (ctx) => {
	try {
		const result = await Task.addTask({ ...ctx.request.body });
		ctx.body = result;
	} catch (err) {
		console.error(err);
		ctx.status = 500;
		ctx.body = 'Error'
	}
})

module.exports = router;