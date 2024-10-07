const { ApolloServer, gql } = require('apollo-server');

// Sample data
const booksAndAuthors = [
    { book: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { book: "To Kill a Mockingbird", author: "Harper Lee" },
    { book: "1984", author: "George Orwell" },
    { book: "Pride and Prejudice", author: "Jane Austen" },
    { book: "The Catcher in the Rye", author: "J.D. Salinger" },
];

// GraphQL schema
const typeDefs = gql`
    type BookAndAuthor {
        book: String
        author: String
    }

    type Query {
        booksAndAuthors: [BookAndAuthor]
    }
`;

// Resolvers
const resolvers = {
    Query: {
        booksAndAuthors: () => booksAndAuthors,
    },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
const PORT = 4000;
server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
