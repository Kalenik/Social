const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type AuthData {
        user: User!
        accessToken: String!
        tokenExpiration: Int!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        city: String
        extraInfo: String
        profileImgSrc: String
        friends: [User!]
        following: [User!]
        followers: [User!]
        createdPosts: [Post!]
    }

    type FollowData {
        user: User!
        subscriberType: String!
    }

    type Post {
        _id: ID!
        title: String!
        text: String!
        created: String!
        updated: String!
        creator: User!
    }

    type LikedPost {
        _id: ID!
        post: Post!
        user: User!
        created: String!
    }

    type Message {
        _id: ID!
        messageText: String!
        created: String!
        updated: String!
    }

    type MessagesData{
        messagesFromYou: [Message!]!
		messagesToYou: [Message!]!
		receiverUser: User!
    }

    type LastMessageData {
        from: User!
        to: User!
        lastMessage: Message!
    }

    type LastMessagesData {
        lastMessagesDataFromYou: [LastMessageData!]!
		lastMessagesDataToYou: [LastMessageData!]!
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    input EditUserInput {
        username: String!
        email: String!
        city: String
        extraInfo: String
        newPassword: String
        currentPassword: String
    }

    input EditPostInput {
        postId: ID!
        title: String!
        text: String!
    }

    input EditMessageInput {
        receiverName: String!
        messageId: ID!
        newMessageText: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        user(userName: String!):User!
        users(exceptUserId: ID): [User!]!
        posts: [Post!]!
        likedPosts: [LikedPost!]!
        messagesData(receiverName: String!): MessagesData!
        lastMessagesData: LastMessagesData!
    }

    type RootMutation {
        refreshTokens: AuthData!
        revokeRefreshToken: Boolean!
        deleteRefreshToken: Boolean!
        createUser(createUserInput: CreateUserInput): AuthData!
        editUser(editUserInput: EditUserInput): User!
        followUser(userId: ID!): FollowData!
        unfollowUser(userId: ID!): FollowData!
        createPost(title: String!, text: String!): Post!
        editPost(editPostInput: EditPostInput): Post!
        deletePost(postId: ID!): Boolean!
        likePost(postId: ID!): LikedPost!
        deleteLikedPost(likedPostId: ID!): Post!
        sendMessage(receiverName: String!, messageText: String!): Message!
        editMessage(editMessageInput: EditMessageInput): Message!
        deleteMessage(receiverName: String!, messageId: ID!): Boolean!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
