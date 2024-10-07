import { gql } from '@apollo/client';

// GraphQL query to fetch books and their authors
const GET_BOOKS_AND_AUTHORS = gql`
    {
        booksAndAuthors {
            book
            author
        }
    }
`;

// Function to fetch books and their authors using GraphQL
export const fetchBooksAndAuthors = async (client) => {
    try {
        const { data } = await client.query({
            query: GET_BOOKS_AND_AUTHORS,
        });
        return data.booksAndAuthors;
    } catch (error) {
        console.error("Error fetching data from GraphQL endpoint:", error);
        throw new Error("Failed to fetch data");
    }
};
