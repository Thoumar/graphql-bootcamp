import {
    GraphQLServer
} from 'graphql-yoga'

const comments = [{
    id: '1',
    text: 'Commenting is so cooool',
    author: '1',
    post: '1'
}, {
    id: '2',
    text: 'Commenting is so fun',
    author: '2',
    post: '1'
}, {
    id: '3',
    text: 'Commenting is so hilarious',
    author: '2',
    post: '2'
}, {
    id: '4',
    text: 'Commenting is so boring',
    author: '4',
    post: '2'
}]

const posts = [{
    id: "1",
    title: "titre article 1",
    body: "text article 1",
    published: true,
    author: '3'
}, {
    id: "2",
    title: "titre article 2",
    body: "text article 2",
    published: true,
    author: '3'
}, {
    id: "3",
    title: "titre article 3",
    body: "text article 3",
    published: true,
    author: '1'
}]


const users = [{
    id: "1",
    name: "thomas",
    email: "thomas.oumar1998@gmail.com",
    age: 12
}, {
    id: "2",
    name: "sarah",
    email: "sarah@gmail.com"
}, {
    id: "3",
    name: "paul",
    email: "paul@gmail.com"
}]

const typeDefs = `
    type Query {
        comments(query: String): [Comment!]!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int,
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter(post => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: "abc123",
                name: "Thomas",
                email: "thomas@thoumar.com"
            }
        },
        post() {
            return {
                id: "abc123",
                title: "My new article",
                body: "This is the body of my new article",
                published: false
            }
        },
        comments(parent, args, ctx, info) {
            // if(!args.query) {
            //     return comments
            // }

            return comments
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.author == parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id = parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find(post => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is up !')
})