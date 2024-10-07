import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchBooksAndAuthors } from "../services/sparqlClient";

const RDFGraphTree = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const books = await fetchBooksAndAuthors();
      const treeData = { name: "Books", children: [] };

      books.forEach((item) => {
        const bookLabel = item.book.value.split("/").pop().replace(/_/g, " ");
        const authorLabel = item.author.value.split("/").pop().replace(/_/g, " ");

        // Check if the book already exists in the tree
        const existingBook = treeData.children.find((child) => child.name === bookLabel);

        if (existingBook) {
          // If the book exists, add the author to its children
          existingBook.children.push({ name: authorLabel });
        } else {
          // If the book does not exist, create a new entry
          treeData.children.push({
            name: bookLabel,
            children: [{ name: authorLabel }],
          });
        }
      });

      setData(treeData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous contents

    // Set dimensions and margins
    const width = 900;
    const height = 600;
    const treeLayout = d3.tree().size([height, width - 160]);

    // Create a root node
    const root = d3.hierarchy(data);
    treeLayout(root);

    // Create links
    svg
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.y)
      .attr("y1", (d) => d.source.x + 10) // Offset to avoid overlap
      .attr("x2", (d) => d.target.y)
      .attr("y2", (d) => d.target.x - 10) // Offset to avoid overlap
      .style("stroke", "#999")
      .style("stroke-width", 2);

    // Create nodes
    const node = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y}, ${d.x})`);

    node
      .append("circle")
      .attr("r", 10)
      .style("fill", (d) => (d.children ? "#69b3a2" : "#ff6347"))
      .style("stroke", "#fff")
      .style("stroke-width", 1.5);

    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", 0) // Align text vertically centered
      .text((d) => d.data.name)
      .style("font-size", "12px")
      .style("fill", "#333"); // Change text color for better visibility

    // Add zoom functionality
    const zoom = d3.zoom().on("zoom", (event) => {
      svg.attr("transform", event.transform);
    });

    svg.call(zoom);
  }, [data]);

  return (
    <div>
      <h3>Books and Authors Tree Visualization</h3>
      <svg ref={svgRef} width="900" height="600" />
    </div>
  );
};

export default RDFGraphTree;
