const httpStatus = require('http-status');
const roomSchema = require('./roomSchema')
const otherHelper = require('../../helper/other.helper');

const roomController = {};

roomController.create = async (req, res, next) => {
    try {
        const room = req.body;
        if (room && room._id) {
            const update = await roomSchema.findByIdAndUpdate(room._id, { $set: room }, { new: true });
            return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Room Updated', null);
        }
        else {
            const new_room = new roomSchema(room);
            const new_room_save = await new_room.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, new_room_save, null, 'Room Created', null);
        }
    } catch (err) {
        next(err);
    }
};

roomController.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await roomSchema.find().lean()
        return otherHelper.sendResponse(res, httpStatus.OK, true, rooms, null, 'All Room Retrieved', null);
    } catch (err) {
        next(err);
    }
};


module.exports = roomController;
