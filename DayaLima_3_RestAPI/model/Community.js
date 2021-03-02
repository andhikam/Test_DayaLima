const client = require('../config/mongo');
const { ObjectID } = require('mongodb');

class CommunityModel {
	static async create(payload) {
		try {
			await client.connect();
			const addCommunity = await client
				.db('dbDayaLima')
				.collection('communities')
				.insertOne(payload);
			return addCommunity;
		} catch (e) {
			console.error(e);
		}
	}

	static async find() {
		try {
			await client.connect();
			const communities = await client
				.db('dbDayaLima')
				.collection('communities')
				.find()
				.toArray();
			return communities;
		} catch (e) {
			console.error(e);
		}
	}

	static async findOne(id) {
		try {
			await client.connect();
			const community = await client
				.db('dbDayaLima')
				.collection('communities')
				.findOne({ _id: ObjectID(id) });
			return community;
		} catch (e) {
			console.error(e);
		}
	}

	static async findName(name) {
		try {
			await client.connect();
			const community = await client
				.db('dbDayaLima')
				.collection('communities')
				.findOne({ name });
			return community;
		} catch (e) {
			console.error(e);
		}
	}

	static async edit(payload) {
		const { id, editCommunity } = payload;
		try {
			await client.connect();
			const editThisCommunity = await client
				.db('dbDayaLima')
				.collection('communities')
				.findOneAndUpdate(
					{ _id: ObjectID(id) },
					{
						$set: {
							name: editCommunity.name,
							description: editCommunity.description,
							imageUrl: editCommunity.imageUrl,
						},
					},
					{ returnOriginal: false }
				);
			return editThisCommunity;
		} catch (e) {
			console.error(e);
		}
	}

	static async delete(id) {
		try {
			await client.connect();
			const deleteCommunity = await client
				.db('dbDayaLima')
				.collection('communities')
				.deleteOne({ _id: ObjectID(id) });
			return deleteCommunity;
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = CommunityModel;
