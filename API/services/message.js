import dummyData from '../utils/dummyData';

import Message from '../models/message';

class MessageService {
  constructor() {
    this.messages = dummyData.Messages;
  }

  static fetchAllMessages() {
    const validMessages = dummyData.Messages.map((messages) => {
      const newMessage = new Message();

      newMessage.id = messages.id;
      newMessage.createdOn = messages.createdOn;
      newMessage.subject = messages.subject;
      newMessage.message = messages.message;
      newMessage.senderId = messages.senderId;
      newMessage.receiverId = messages.receiverId;
      newMessage.parentMessageId = messages.parentMessageId;
      newMessage.status = messages.status;

      return newMessage;
    });

    return validMessages;
  }

  static fetchUnreadMessages() {
    const validUnreadMessages = dummyData.Messages.filter(messages => messages.status === 'unread');
    return validUnreadMessages;
  }

  static fetchSentMessages() {
    const validSentMessages = dummyData.Messages.filter(messages => messages.status === 'sent');
    return validSentMessages;
  }

  static getAMessage(id) {
    const specificMessage = dummyData.Messages.find(messages => messages.id === parseInt(id, 10));

    return specificMessage || [];
  }
}

export default MessageService;
