import React from "react";
import PostList from "./components/PostList";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>md&me</h1>
      <h2>The symptom checker that works</h2>
      <PostList />
    </div>
  );
};

export default App;
