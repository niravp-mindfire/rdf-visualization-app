import SparqlClient from 'sparql-client-2';

// DBpedia SPARQL endpoint
const endpoint = 'https://dbpedia.org/sparql';
const client = new SparqlClient(endpoint);

// Function to fetch books and their authors
export const fetchBooksAndAuthors = async () => {
  const query = `
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    
    SELECT ?book ?author WHERE {
      ?book a dbo:Book .
      ?book dbo:author ?author .
    }
    LIMIT 10
  `;

  try {
    const response = await client.query(query).execute();
    if (response.results && response.results.bindings) {
      return response.results.bindings;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching data from SPARQL endpoint:", error);
    throw new Error("Failed to fetch data");
  }
};
