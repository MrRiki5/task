/* Replace with your SQL commands */

CREATE TABLE "Users"
(
	id SERIAL NOT NULL,
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    doctor_id integer NOT NULL,
    select_time timestamp with time zone
);


CREATE TABLE "Doctors"
(
    id SERIAL NOT NULL,
    name character varying(30) NOT NULL,
    specialization character varying(30) NOT NULL
);

CREATE TABLE "Time_slots"
(
    doctor_id integer,
    slot text
);