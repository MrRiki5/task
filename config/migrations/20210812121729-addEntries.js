'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = async function (db) {
	for (let i = 0; i < 10; i++) {
		let time = new Date();
		let min = i * 15;
		time.setDate(time.getDate() + 1);
		time.setHours(10, min, 0, 0);
		await db.insert('Users', ['name', 'phone', 'doctor_id', 'select_time'], ['User' + i + 1, '+2365164', i + 1, time.toISOString()]);
	}
	for (let i = 1; i <= 10; i++) {
		await db.insert('Doctors', ['name', 'specialization'], ['Doctors' + i, 'family doctor']);
	}
	for (let i = 1; i <= 10; i++) {
		let time = [
			'10.00', '10.15', '10.30', '10.45',
			'11.00', '11.15', '11.30', '11.45',
			'12.00', '12.15', '12.30', '12.45',
			'14.00', '14.15', '14.30', '14.45',
			'15.00', '15.15', '15.30', '15.45',
			'16.00', '16.15', '16.30', '16.45',
		]
		time = time.join();
		await db.insert('Time_slots', ['doctor_id', 'slot'], [i, time]);
	}
	return null;
};

exports.down = function (db) {
	db.runSql('DELETE FROM "Users"');
	return null;
};

exports._meta = {
	"version": 1
};
