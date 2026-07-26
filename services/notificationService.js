import { createNotification } from "../models/notificationModel.js";
import { notificationQueue } from "../queues/notificationQueue.js";

export const sendNotification = async (userId, message) => {

    const notification = await createNotification(
        userId,
        message
    );

    await notificationQueue.add(
        "send-notification-email",
        {
            userId,
            message
        }
    );

    return notification;
};