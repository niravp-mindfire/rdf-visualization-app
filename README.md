# GraphQL Server for Books and Authors

This project sets up a simple GraphQL server using Apollo Server. The server fetches a list of books and their authors from static data.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. **Clone the repository** (or create a new directory):

   ```bash
   git clone <your-repository-url>
   cd graphql-server

2. **Install the required packages:**

   ```bash
   npm install

### Running the Server

1. **Start the server:**

    ```bash
    node server.js

2. **Open your browser and go to http://localhost:4000/ to access the GraphQL Playground.**

### Testing the API

1. **In the GraphQL Playground, you can run the following query to fetch the list of books and their authors:**

    ```bash
    {
        booksAndAuthors {
            book
            author
        }
    }

2. **Press the "Play" button to execute the query. You should receive a response with the book titles and their respective authors.**

### Sample Data Structure
The API returns a list of books and authors in the following format:

    ```json
    {
        "data": {
            "booksAndAuthors": [
                { "book": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
                { "book": "To Kill a Mockingbird", "author": "Harper Lee" },
                { "book": "1984", "author": "George Orwell" },
                { "book": "Pride and Prejudice", "author": "Jane Austen" },
                { "book": "The Catcher in the Rye", "author": "J.D. Salinger" }
            ]
        }
    }

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments
Apollo Server for providing a robust GraphQL server framework.
GraphQL for the query language for APIs.


### How to Use

1. **Copy and paste** the content into a file named `README.md` in the root directory of your project.
2. Modify the `<your-repository-url>` in the **Installation** section with your actual repository URL if you're hosting the code on a platform like GitHub.

This README provides a concise overview of your project, including setup instructions, API testing details, and future improvement suggestions. Let me know if you need any modifications or additional information!


