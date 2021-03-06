const mongoose = require('mongoose');

const subDocSchema = new mongoose.Schema({
	value: String || Number,
	id: String,
});

const expertiseSchema = new mongoose.Schema({
	expertiseKey: String || Number,
	name: String,
	skills: [subDocSchema],
});

const educationSchema = new mongoose.Schema({
	academy: String,
	period: String,
	certificate: String,
});

const experienceSchema = new mongoose.Schema({
	company: String,
	period: String,
	place: String,
	occupiedPosition: String,
	achievements: [subDocSchema],
	stack: [subDocSchema],
	description: String,
	project: String,
	exp_id: String,
});

const resumeSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	position: String,
	introduction: String,
	portfolio: String,
	socialMedias: String,
	expertises: [expertiseSchema],
	softSkills: [subDocSchema],
	experiences: Array,
	createdtAt: Date,
	state: String,
	experiences: [experienceSchema],
	education: educationSchema,
	profilPic: String,
	colorMain: String,
});

const resumeModel = mongoose.model('resume', resumeSchema);

module.exports = resumeModel;
