import { useState } from "react";

// Custom hook for "Show More" functionality
export const useShowMore = (array, initialCount = 5) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const hasMore = visibleCount < array?.length;

  const showMore = () => {
    setVisibleCount(array?.length); // Show all elements
  };

  // Return the sliced array, the showMore function, and whether there are more elements to show
  return {
    visibleItems: array?.slice(0, visibleCount),
    showMore,
    hasMore,
  };
};
