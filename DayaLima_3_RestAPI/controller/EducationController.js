const Education = require('../model/Education');

class EducationController {
	static fetchEducation(req, res, next) {
		Education.find()
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((err) => {
				res.status(500).json('Oops, Something is Wrong');
			});
	}

	static async fetchOneEducation(req, res, next) {
		const idParams = req.params.id;
		const dataEducation = await Education.findOne(idParams);

		if (dataEducation) {
			res.status(200).json(dataEducation);
		} else {
			next({
				name: 'educationNotFound',
				idEducation: idParams,
			});
		}
	}

	static async create(req, res, next) {
		const newEducation = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		};
		const education = await Education.findName(newEducation.name);

		if (education) {
			next({
				name: 'educationIsExist',
			});
		} else {
			if (
				!newEducation.name ||
				!newEducation.description ||
				!newEducation.imageUrl
			) {
				next({
					name: 'emptyInput',
				});
			} else {
				Education.create(newEducation)
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

	static editEducation(req, res, next) {
		const id = req.params.id;
		const editEducation = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		};
		const payload = { id, editEducation };

		if (
			!editEducation.name ||
			!editEducation.description ||
			!editEducation.imageUrl
		) {
			next({
				name: 'emptyInput',
			});
		} else {
			Education.findOne(id)
				.then((response) => {
					if (!response) {
						next({
							name: 'educationNotFound',
							idEducation: id,
						});
					} else {
						return Education.edit(payload);
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

	static async deleteEducation(req, res, next) {
		const id = req.params.id;
		const education = await Education.findOne(id);

		if (!education) {
			next({
				name: 'educationNotFound',
				idEducation: id,
			});
		} else {
			Education.delete(id)
				.then((response) => {
					res
						.status(200)
						.json({ message: `Education with id : ${id} has been deleted` });
				})
				.catch((err) => {
					res.status(500).json('Oops, Something is Wrong');
				});
		}
	}
}

module.exports = EducationController;
