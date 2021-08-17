const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router');
const fs = require("fs");
const db = require('./config/db');

const app = new Koa();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());



async function cheak() {
	let timeNow = new Date();
	let timeTwoHour = new Date(timeNow.getTime() + 2 * 60 * 60 * 1000);
	let timePlusDay = new Date(timeNow.getTime() + 24 * 60 * 60 * 1000);
	const result = await db.any(`SELECT * FROM public."Users" WHERE select_time > $1 AND select_time < $2 OR select_time > $3 AND select_time < $4`,
		[timeTwoHour, new Date(timeTwoHour.getTime() + 60000), timePlusDay, new Date(timePlusDay.getTime() + 60000)]);
	if (result) {
		for (let i = 0; i < result.length; i++) {
			let data = `${timeNow.toString()} | Привет ${result[i].name}!`;
			let doctorSpec = await db.one(`SELECT specialization FROM public."Doctors" WHERE id=$1`, [result[i].doctor_id]);
			if (result[i].select_time.getDate() !== timeNow.getDate()) {
				data += `Напоминаем что вы записаны к ${doctorSpec.specialization} завтра в ${result[i].select_time.getHours() + ':' + result[i].select_time.getMinutes()}!`
			} else {
				data += `Вам через 2 часа к ${doctorSpec.specialization} завтра в ${result[i].select_time.getHours() + ':' + result[i].select_time.getMinutes()}!`
			}
			fs.appendFileSync("Push.log", `${data} \n`);

		}
	}
	setTimeout(cheak, 60000)
}
cheak();

app.listen(3000, () => {
	console.log('http://localhost:3000')
});
