const db = require('../config/db');

exports.addTask = async ({ name, phone, doctorId, selectTime }) => {
	try {
		const node = await db.any(`SELECT count(*) FROM public."Users" WHERE doctor_id = $1 AND select_time = $2`, [doctorId, selectTime]);
		if (node[0]['count'] == 0) {
			const result = await db.one(`INSERT INTO public."Users"(name, phone, doctor_id, select_time) VALUES($1, $2, $3, $4) RETURNING *`, [name, phone, doctorId, selectTime]);
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
	}

}