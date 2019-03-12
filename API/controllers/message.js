import MessageService from '../services/message';

class MessageController {
  constructor() {
    this.Messages = [];
  }

  static fetchAllMessages(req, res) {
    const allMessages = MessageService.fetchAllMessages();

    return res.send({
      status: 200,
      data: allMessages,
    });
  }

  static fetchUnreadMessages(req, res) {
    const unreadMessages = MessageService.fetchUnreadMessages();
    if (unreadMessages.length < 1) {
      return res.send({
        status: 404,
        message: 'message not found',
      });
    }
    return res.json({
      status: 200,
      data: unreadMessages,
    });
  }

  static fetchSentMessages(req, res) {
    const sentMessages = MessageService.fetchSentMessages();
    if (sentMessages.length < 1) {
      return res.json({
        status: 404,
        message: 'message not found',
      });
    }
    return res.json({
      status: 200,
      data: sentMessages,
    });
  }

  static getAMessage(req, res) {
    const { id } = req.params;

    const foundMessage = MessageService.getAMessage(id);
    if (foundMessage.length < 1) {
      return res.json({
        status: 404,
        message: 'message not found',
      });
    }
    return res.json({
      status: 200,
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

    return res.json({
      status: 201,
      data: createdMessage,
    });
  }
}

export default MessageController;
