import MessageService from '../services/message';

class MessageController {
  constructor() {
    this.Messages = [];
  }

  static fetchAllMessages(req, res) {
    const allMessages = MessageService.fetchAllMessages();

    return res.status(200).send({
      status: 'success',
      data: allMessages,
    });
  }

  static fetchUnreadMessages(req, res) {
    const unreadMessages = MessageService.fetchUnreadMessages();
    if (unreadMessages.length < 1) {
      return res.status(404).send({
        status: 'failure',
        message: 'message not found',
      });
    }
    return res.status(200).send({
      status: 'success',
      data: unreadMessages,
    });
  }

  static fetchSentMessages(req, res) {
    const sentMessages = MessageService.fetchSentMessages();
    if (sentMessages.length < 1) {
      return res.status(404).send({
        status: 'failure',
        message: 'message not found',
      });
    }
    return res.status(200).send({
      status: 'success',
      data: sentMessages,
    });
  }

  static getAMessage(req, res) {
    const { id } = req.params;

    const foundMessage = MessageService.getAMessage(id);
    if (foundMessage.length < 1) {
      return res.status(404).send({
        status: 'failure',
        message: 'message not found',
      });
    }
    return res.status(200).send({
      status: 'success',
      data: foundMessage,
    });
  }

  static sendMessage(req, res) {
    /*

        Expect a json of the format
         {
             id: Integer,
             createdOn: DateTime,
             subject: String,
             message: String,
             parentMessageId: Integer,
             status: String
         }

    */
    const newMessage = req.body;

    const createdMessage = MessageService.sendMessage(newMessage);

    return res.status(201).send({
      status: 'success',
      data: createdMessage,
    });
  }
}

export default MessageController;
