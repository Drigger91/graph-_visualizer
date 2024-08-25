import React, { useEffect, useState } from "react";
import create from "./graph/createGraph";
import GraphElement from "./component/graph";
import "./App.css";
import Input from "./component/input";
import input from "./inputFormat";

interface IGraph {
  nodes: { id: number; label: string }[];
  edges: { from: number; to: number }[];
}

const App = () => {
  const [inputString, setinputString] = useState("");
  const [graph, setGraph] = useState<IGraph>({ nodes: [], edges: [] });
  const [showGraph, setShowGraph] = useState(false);
  const [inputFormat, setinputFormat] = useState("edg");
  const [graphType, setGraphType] = useState("undirected");
  const [error, setError] = useState("");
  const [isWeighted, setIsWeighted] = useState(false);
  const [is0, setIs0] = useState(false);
  const [inputType, setInputType] = useState("plain");

  let f =
    input[is0 ? "s0" : "s1"][inputType][isWeighted ? "w" : "unw"][inputFormat];
  
  useEffect(() => {
    setinputString(f.in);
  }, [f]);

  const parse = () => {
    setError("");
    try {
      setGraph(
        create(
          inputString.trim(),
          inputFormat,
          graphType,
          isWeighted,
          is0,
          inputType === "plain"
        )
      );
      setShowGraph(true);
    } catch (err) {
      console.error(err);
      setError("Enter a valid Array according to the format.");
    }
  };

  if (showGraph)
    return (
      <GraphElement
        graph={graph}
        inputString={inputString}
        graphType={graphType}
        inputFormat={inputFormat}
        isDirected={graphType === "directed"}
        isWeighted={isWeighted}
        setShowGraph={setShowGraph}
        is0={is0}
      />
    );

  const props = {
    isWeighted,
    setIsWeighted,
    setinputString,
    parse,
    inputString,
    setinputFormat,
    is0,
    setIs0,
    inputFormat,
    setGraphType,
    graphType,
    error,
    inputType,
    setInputType,
    format: f,
  };
  return <Input {...props} />;
};

export default App;
