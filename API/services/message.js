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
        });

        return validMessages;
    },

    addMessages(messages){
        const messagesLength = dummyData.Messages.length;

        const lastId = dummyData.Messages[messagesLength - 1].id;

        const newId = lastId + 1;

        dummyData.Messages.push(messages);

        return messages;
    },

    getAMessage(id){
        const messages = dummyData.Messages.find(messages => messages.id = id);

        return messages || {};
    }
}

export default MessageService;