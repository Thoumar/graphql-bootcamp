const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  me() {
    return {
      id: "abc123",
      name: "Thomas",
      email: "thomas@thoumar.com",
    };
  },
  post() {
    return {
      id: "abc123",
      title: "My new article",
      body: "This is the body of my new article",
      published: false,
    };
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
