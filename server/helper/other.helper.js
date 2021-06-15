const crypto = require('crypto');

const otherHelper = {};

otherHelper.generateRandomHexString = (len) => {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len)
        .toUpperCase(); // return required number of characters
};

otherHelper.parseFilters = (req) => {
    const size_default = 10;
    let page;
    let size;
    let searchQuery = {};
    let sortQuery = {};
    let populate = [];
    let selectQuery = { __v: 0 };

    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
        page = Math.abs(req.query.page);
    } else {
        page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
        size = Math.abs(req.query.size);
    } else {
        size = size_default;
    }
    return { page, size, searchQuery, selectQuery, sortQuery, populate };
};

otherHelper.getQuerySendResponse = async (model, page, size, sortQuery, searchQuery, selectQuery, next, populate) => {
    let sentData = {};
    try {
        sentData.data = await model
            .find(searchQuery)
            .select(selectQuery)
            .sort(sortQuery)
            .skip((page - 1) * size)
            .limit(size * 1)
            .populate(populate)
            .lean();
        sentData.totalData = await model.countDocuments(searchQuery);
        return sentData;
    } catch (err) {
        next(err);
    }
};

otherHelper.paginationSendResponse = (res, status, success, data, message, pageNo, pagesize, totalData, sort) => {
    const response = {};
    if (data) response.data = data;
    if (success !== null) response.success = success;
    if (message) response.message = message;
    if (pageNo) response.page = pageNo;
    if (pagesize) response.size = pagesize;
    if (sort) response.sort = sort;
    if (typeof totalData === 'number') response.totalData = totalData;
    return res.status(status).json(response);
};

otherHelper.sendResponse = (res, status, success, data, errors, message, token) => {
    const response = {};
    if (success !== null) response.success = success;
    if (data !== null) response.data = data;
    if (errors !== null) response.errors = errors;
    if (message !== null) response.message = message;
    if (token !== null) response.token = token;
    return res.status(status).json(response);
};

module.exports = otherHelper;
