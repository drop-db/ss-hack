module.exports = async function sendResponseV1(res, status, result = {}, errors = []) {
    const response = {
        ...result,
    };
    if (errors.length) {
        response.errors = errors;
    }
    res.status(status).json(response);
};
