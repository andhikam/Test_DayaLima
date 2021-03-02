const Company = require('../model/Company');

class CompanyController {
	static fetchCompany(req, res, next) {
		Company.find()
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((err) => {
				res.status(500).json('Oops, Something is Wrong');
			});
	}

	static async fetchOneCompany(req, res, next) {
		const idParams = req.params.id;
		const dataCompany = await Company.findOne(idParams);

		if (dataCompany) {
			res.status(200).json(dataCompany);
		} else {
			next({
				name: 'companyNotFound',
				idCompany: idParams,
			});
		}
	}

	static async create(req, res, next) {
		const newCompany = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		};
		const company = await Company.findName(newCompany.name);

		if (company) {
			next({
				name: 'companyIsExist',
			});
		} else {
			if (!newCompany.name || !newCompany.description || !newCompany.imageUrl) {
				next({
					name: 'emptyInput',
				});
			} else {
				Company.create(newCompany)
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

	static editCompany(req, res, next) {
		const id = req.params.id;
		const editCompany = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
		};
		const payload = { id, editCompany };

		if (
			!editCompany.name ||
			!editCompany.description ||
			!editCompany.imageUrl
		) {
			next({
				name: 'emptyInput',
			});
		} else {
			Company.findOne(id)
				.then((response) => {
					if (!response) {
						next({
							name: 'companyNotFound',
							idCompany: id,
						});
					} else {
						return Company.edit(payload);
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

	static async deleteCompany(req, res, next) {
		const id = req.params.id;
		const company = await Company.findOne(id);

		if (!company) {
			next({
				name: 'companyNotFound',
				idCompany: id,
			});
		} else {
			Company.delete(id)
				.then((response) => {
					res
						.status(200)
						.json({ message: `Company with id : ${id} has been deleted` });
				})
				.catch((err) => {
					res.status(500).json('Oops, Something is Wrong');
				});
		}
	}
}

module.exports = CompanyController;
