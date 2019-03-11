import dummyData from '../utils/dummyData';

import Message from '../models/message';

const MessageService = {
    fetchAllMessages() {
        const validMessages = dummyData.Messages.map((messages) => {
            const newMessage = new Message();

            newMessage.id = messages.id;
            newMessage.createdOn = messages.createdOn;
            newMessage.subject = messages.subject;
            newMessage.message = messages.message;
            newMessage.parentMessageId = messages.parentMessageId;
            newMessage.status = messages.status;

            return newMessage;
        });

        return validMessages;
    },

    fetchUnreadMessages() {
        const validUnreadMessages = dummyData.unreadMessages.map((unreadMessages) => {
            const newUnreadMessage = new Message();

            newUnreadMessage.id = unreadMessages.id;
            newUnreadMessage.createdOn = unreadMessages.createdOn;
            newUnreadMessage.subject = unreadMessages.subject;
            newUnreadMessage.message = unreadMessages.message;
            newUnreadMessage.senderId = unreadMessages.senderId;
            newUnreadMessage.receiverId = unreadMessages.receiverId;
            newUnreadMessage.parentMessageId = unreadMessages.parentMessageId;
            newUnreadMessage.status = unreadMessages.status;

            return newUnreadMessage;
        });

        return validUnreadMessages;
    },
}

export default MessageService;