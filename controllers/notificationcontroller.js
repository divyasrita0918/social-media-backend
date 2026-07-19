import {getNotificationsByUser,markNotificationAsRead} from "../models/notificationModel.js";

export const getNotifications = async (req, res, next) => {

    try {
        const notifications = await getNotificationsByUser(req.user.id);
        res.json(notifications);
    } catch (error) {
        next(error);
    }
};

export const readNotification = async (req, res, next) => {
    try {
        const notification = await markNotificationAsRead(req.params.id);
        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }
        res.json(notification);
    } catch (error) {
        next(error);
    }
};