const client = require('../config/mongo');
const { ObjectID } = require('mongodb');

class CompanyModel {
	static async create(payload) {
		try {
			await client.connect();
			const addCompany = await client
				.db('dbDayaLima')
				.collection('companies')
				.insertOne(payload);
			return addCompany;
		} catch (e) {
			console.error(e);
		}
	}

	static async find() {
		try {
			await client.connect();
			const companies = await client
				.db('dbDayaLima')
				.collection('companies')
				.find()
				.toArray();
			return companies;
		} catch (e) {
			console.error(e);
		}
	}

	static async findOne(id) {
		try {
			await client.connect();
			const company = await client
				.db('dbDayaLima')
				.collection('companies')
				.findOne({ _id: ObjectID(id) });
			return company;
		} catch (e) {
			console.error(e);
		}
	}

	static async findName(name) {
		try {
			await client.connect();
			const company = await client
				.db('dbDayaLima')
				.collection('companies')
				.findOne({ name });
			return company;
		} catch (e) {
			console.error(e);
		}
	}

	static async edit(payload) {
		const { id, editCompany } = payload;
		try {
			await client.connect();
			const editThisCompany = await client
				.db('dbDayaLima')
				.collection('companies')
				.findOneAndUpdate(
					{ _id: ObjectID(id) },
					{
						$set: {
							name: editCompany.name,
							description: editCompany.description,
							imageUrl: editCompany.imageUrl,
						},
					},
					{ returnOriginal: false }
				);
			return editThisCompany;
		} catch (e) {
			console.error(e);
		}
	}

	static async delete(id) {
		try {
			await client.connect();
			const deleteCompany = await client
				.db('dbDayaLima')
				.collection('companies')
				.deleteOne({ _id: ObjectID(id) });
			return deleteCompany;
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = CompanyModel;
