export function mergeVideoAndPlaylists(arr1, arr2) {
  // Step 1: Merge the arrays
  const mergedArray = [...arr1, ...arr2];

  // Step 2: Shuffle the merged array using Fisher-Yates algorithm
  for (let i = mergedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]]; // Swap elements
  }

  return mergedArray;
}