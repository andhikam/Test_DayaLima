const client = require('../config/mongo');
const { ObjectID } = require('mongodb');

class EducationModel {
	static async create(payload) {
		try {
			await client.connect();
			const addEducation = await client
				.db('dbDayaLima')
				.collection('educations')
				.insertOne(payload);
			return addEducation;
		} catch (e) {
			console.error(e);
		}
	}

	static async find() {
		try {
			await client.connect();
			const educations = await client
				.db('dbDayaLima')
				.collection('educations')
				.find()
				.toArray();
			return educations;
		} catch (e) {
			console.error(e);
		}
	}

	static async findOne(id) {
		try {
			await client.connect();
			const education = await client
				.db('dbDayaLima')
				.collection('educations')
				.findOne({ _id: ObjectID(id) });
			return education;
		} catch (e) {
			console.error(e);
		}
	}

	static async findName(name) {
		try {
			await client.connect();
			const education = await client
				.db('dbDayaLima')
				.collection('educations')
				.findOne({ name });
			return education;
		} catch (e) {
			console.error(e);
		}
	}

	static async edit(payload) {
		const { id, editEducation } = payload;
		try {
			await client.connect();
			const editThisEducation = await client
				.db('dbDayaLima')
				.collection('educations')
				.findOneAndUpdate(
					{ _id: ObjectID(id) },
					{
						$set: {
							name: editEducation.name,
							description: editEducation.description,
							imageUrl: editEducation.imageUrl,
						},
					},
					{ returnOriginal: false }
				);
			return editThisEducation;
		} catch (e) {
			console.error(e);
		}
	}

	static async delete(id) {
		try {
			await client.connect();
			const deleteEducation = await client
				.db('dbDayaLima')
				.collection('educations')
				.deleteOne({ _id: ObjectID(id) });
			return deleteEducation;
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = EducationModel;
