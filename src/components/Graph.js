import React, { useEffect, useState, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import { fetchBooksAndAuthors } from '../services/sparqlClient';
import Loading from './Loading';

const Graph = () => {
  const [networkData, setNetworkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [graphContainer, setGraphContainer] = useState(null); // State to hold the graph container
  const networkRef = useRef(null); // Reference for the Network instance

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const books = await fetchBooksAndAuthors();
        console.log('Fetched Books and Authors:', books);

        const nodes = new DataSet();
        const edges = new DataSet();

        books.forEach((item, index) => {
          const bookId = `book${index}`;
          const bookLabel = item.book.value.split('/').pop().replace(/_/g, ' ');
          const authorLabel = item.author.value.split('/').pop().replace(/_/g, ' ');

          nodes.add({ id: bookId, label: bookLabel });
          nodes.add({ id: item.author.value, label: authorLabel });

          edges.add({ from: bookId, to: item.author.value });
        });

        console.log('Nodes:', nodes);
        console.log('Edges:', edges);

        setNetworkData({ nodes, edges });
        console.log('Network data set:', { nodes, edges });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load graph data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  // Initialize the graph once the networkData and graphContainer are available
  useEffect(() => {
    console.log('Current graphContainer:', graphContainer); // Log the graphContainer
    console.log('Current networkData:', networkData); // Log the networkData

    if (networkData && graphContainer) {
      console.log('Initializing Network...');
      const options = {
        physics: true, // Enable physics simulation for dynamic layout
      };

      // Create the Network instance if it doesn't exist
      if (!networkRef.current) {
        console.log('Creating new Network instance...');
        networkRef.current = new Network(graphContainer, networkData, options);
        console.log('Network instance created:', networkRef.current);

        // Listen for click events on the graph
        networkRef.current.on('click', (params) => {
          console.log('Clicked nodes:', params.nodes);
        });
      } else {
        // If the Network instance already exists, update its data
        networkRef.current.setData(networkData);
      }

      // Clean up the network instance when the component unmounts
      return () => {
        if (networkRef.current) {
          networkRef.current.destroy();
          networkRef.current = null; // Reset the reference
        }
      };
    } else {
      console.log('Graph reference or network data not available yet:', { graphContainer, networkData });
    }
  }, [networkData, graphContainer]); // Depend on both networkData and graphContainer

  // Set the graph container using a callback ref
  const setContainerRef = (node) => {
    if (node) {
      setGraphContainer(node);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div
      ref={setContainerRef}
      style={{ height: '600px', border: '1px solid lightgray' }} // Added border for visibility
    />
  );
};

export default Graph;
