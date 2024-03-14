import React from "react";
import { updatePostHugs } from "../utils/api";

const useHugs = (postUrl: string, initialHugs: number) => {
  const [num_hugs, setNumHugs] = React.useState(initialHugs);

  const handleHugClick = async () => {
    try {
      await updatePostHugs(postUrl);
      setNumHugs((prevHugs) => prevHugs + 1);
    } catch (err) {
      console.error("Error updating hugs:", err);
    }
  };

  return { num_hugs, handleHugClick };
};

export default useHugs;
