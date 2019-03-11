export default {
    Messages: [
        {
            id: 1,
            createdOn: "25/10/2019 9:50pm",
            subject: "Bootcamp",
            message: "This is Andela",
            senderId: 1,
            receiverId: 1,
            parentMessageId: 1,
            status: "unread"
        },

        {
            id: 2,
            createdOn: "26/10/2019 10:50pm",
            subject: "Fellowship",
            message: "This is Naija",
            senderId: 2,
            receiverId: 2,
            parentMessageId: 2,
            status: "read"
        },

        {
            id: 3,
            createdOn: "27/10/2019 11:50pm",
            subject: "Interview",
            message: "This is EPIC Tower",
            senderId: 3,
            receiverId: 3,
            parentMessageId: 3,
            status: "sent"
        }
    ],

    unreadMessages:[
        {
              id: 1,
              createdOn: "28/10/2019 12:50pm",
              subject: "Money",
              message: "I want money",
              senderId: 2,
              receiverId: 3,
              parentMessageId: 4,
              status: "unread"
          },
  
          {
              id: 2,
              createdOn: "29/10/2019 01:50pm",
              subject: "Love",
              message: "I want love",
              senderId: 3,
              receiverId: 4,
              parentMessageId: 5,
              status: "unread"
          }
    ]
}