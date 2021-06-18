const httpStatus = require('http-status');
const messageSchema = require('./messageSchema')
const otherHelper = require('../../helper/other.helper');

const messageController = {};

messageController.create = async (req, res, next) => {
    try {
        const message = req.body;

        const new_message = new messageSchema(message);
        const new_message_save = await new_message.save();
        return otherHelper.sendResponse(res, httpStatus.OK, true, new_message_save, null, 'Mesasge Created', null);
    } catch (err) {
        next(err);
    }
};

messageController.getAllMessageUser = async (req, res, next) => {
    try {
        const user_id = req.user.user._id
        const messages = await messageSchema.find({ user: user_id }).lean()
        return otherHelper.sendResponse(res, httpStatus.OK, true, messages, null, 'All Message of given Room Retrieved', null);
    } catch (err) {
        next(err);
    }
};

messageController.getAllMessageRoom = async (req, res, next) => {
    try {
        const room_id = req.params.id
        const messages = await messageSchema.find({ room: room_id }).populate([{ path: 'sender', select: 'name' }, { path: 'room', select: 'name' }]).lean()
        return otherHelper.sendResponse(res, httpStatus.OK, true, messages, null, 'All Message of given Room Retrieved', null);
    } catch (err) {
        next(err);
    }
};


module.exports = messageController;
