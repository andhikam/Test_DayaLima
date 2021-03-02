module.exports = (err, req, res, next) => {
	let status = 500;
	let message = 'Internal Server Error';

	if (err.name === 'emptyInput') {
		status = 400;
		message = 'All Field Must be Filled';
	} else if (err.name === 'communityNotFound') {
		status = 404;
		message = `Community with id ${err.idCommunity} is Not Found`;
	} else if (err.name === 'companyNotFound') {
		status = 404;
		message = `Company with id ${err.idCompany} is Not Found`;
	} else if (err.name === 'educationNotFound') {
		status = 404;
		message = `Education with id ${err.idEducation} is Not Found`;
	} else if (err.name === 'communityIsExist') {
		status = 400;
		message = 'Community with that Name is Already Exist';
	} else if (err.name === 'companyIsExist') {
		status = 400;
		message = 'Company with that Name is Already Exist';
	} else if (err.name === 'educationIsExist') {
		status = 400;
		message = 'Education with that Name is Already Exist';
	}
	res.status(status).json({
		message: message,
	});
};
