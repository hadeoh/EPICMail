import MessageService from '../services/message'

const MessageController = {
    fetchAllMessages(req, res){
        const allMessages = MessageService.fetchAllMessages();

        return res.json({
            status: 'success',
            data: allMessages
        }).status(200);
},

        fetchSentMessages(req, res){
            const allMessages = MessageService.fetchSentMessages();

            return res.json({
                status: 'success',
                data: allMessages
            }).status(200);
        },

    fetchUnreadMessages(req, res){
        const unreadMessages = MessageService.fetchUnreadMessages();

        return res.json({
            status: 'success',
            data: unreadMessages
        }).status(200);
    }
}

export default MessageController;
