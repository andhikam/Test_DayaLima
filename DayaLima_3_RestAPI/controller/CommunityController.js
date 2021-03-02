const Community = require('../model/Community');

class CommunityController {
	static fetchCommunity(req, res, next) {
		Community.find()
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((err) => {
				res.status(500).json('Oops, Something is Wrong');
			});
	}

	static async fetchOneCommunity(req, res, next) {
		const idParams = req.params.id;
		const dataCommunity = await Community.findOne(idParams);

		if (dataCommunity) {
			res.status(200).json(dataCommunity);
		} else {
			next({
				name: 'communityNotFound',
				idCommunity: idParams,
			});
		}
	}

	static async create(req, res, next) {
		const newCommunity = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		};
		const community = await Community.findName(newCommunity.name);

		if (community) {
			next({
				name: 'communityIsExist',
			});
		} else {
			if (
				!newCommunity.name ||
				!newCommunity.description ||
				!newCommunity.imageUrl
			) {
				next({
					name: 'emptyInput',
				});
			} else {
				Community.create(newCommunity)
					.then((response) => {
						res.status(201).json(response.ops[0]);
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json('Oops, Something is Wrong');
					});
			}
		}
	}

	static editCommunity(req, res, next) {
		const id = req.params.id;
		const editCommunity = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		};
		const payload = { id, editCommunity };

		if (
			!editCommunity.name ||
			!editCommunity.description ||
			!editCommunity.imageUrl
		) {
			next({
				name: 'emptyInput',
			});
		} else {
			Community.findOne(id)
				.then((response) => {
					if (!response) {
						next({
							name: 'communityNotFound',
							idCommunity: id,
						});
					} else {
						return Community.edit(payload);
					}
				})
				.then((response) => {
					res.status(202).json(response.value);
				})
				.catch((err) => {
					res.status(500).json('Oops, Something is Wrong');
				});
		}
	}

	static async deleteCommunity(req, res, next) {
		const id = req.params.id;
		const community = await Community.findOne(id);

		if (!community) {
			next({
				name: 'communityNotFound',
				idCommunity: id,
			});
		} else {
			Community.delete(id)
				.then((response) => {
					res
						.status(200)
						.json({ message: `Community with id : ${id} has been deleted` });
				})
				.catch((err) => {
					res.status(500).json('Oops, Something is Wrong');
				});
		}
	}
}

module.exports = CommunityController;
