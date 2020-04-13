let comments = [{
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

let posts = [{
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


let users = [{
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

const db = {
    users,
    posts,
    comments
}

export {
    db as
    default
}