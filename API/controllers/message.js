import MessageService from '../services/message'

const MessageController = {
    fetchAllMessages(req, res){
        const allMessages = MessageService.fetchAllMessages();

        return res.json({
            status: 'success',
            data: allMessages
        }).status(200);
};

export default MessageController;