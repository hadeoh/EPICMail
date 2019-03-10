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
    }

}

export default MessageService;