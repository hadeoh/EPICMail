import MessageService from '../services/message'

const MessageController = {
    fetchAllMessages(req, res){
        const allMessages = MessageService.fetchAllMessages();

        return res.json({
            status: 'success',
            data: allMessages
        }).status(200);
    },

    addMessages(req, res){
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

       const createdMessage = MessageService.addMessages(newMessage);

       return res.json({
           status: 'success',
           data: createdMessage
       }).status(201);
    },

    getAMessage(req, res){
        const id = req.params.id;

        const foundMessage = MessageService.getAMessage(id);

        return res.json({
            status: 'success',
            data: foundMessage
        }).status(201);
    }
};

export default MessageController;