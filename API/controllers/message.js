import MessageService from '../services/message';

const MessageController = {
  fetchAllMessages(req, res) {
    const allMessages = MessageService.fetchAllMessages();

    return res.status(200).send({
      status: 'success',
      data: allMessages,
    });
  },

  fetchUnreadMessages(req, res) {
    const unreadMessages = MessageService.fetchUnreadMessages();

    return res.status(200).send({
      status: 'success',
      data: unreadMessages,
    });
  },

  fetchSentMessages(req, res) {
    const sentMessages = MessageService.fetchSentMessages();

    return res.status(200).send({
      status: 'success',
      data: sentMessages,
    });
  },
  getAMessage(req, res) {
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
  },

};

export default MessageController;
