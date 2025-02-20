export function timeAgo(dateString) {
  const now = new Date();
  const inputDate = new Date(dateString);
  const diffInMs = now - inputDate; // Difference in milliseconds

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "just now";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
  if (diffInDays === 1) {
    return "yesterday";
  }
  if (diffInDays < 2) {
    return `${diffInDays} day ago`;
  }

  // If more than 2 days, return the date in a readable format
  return inputDate.toLocaleDateString();
}



export const formatTime = seconds => {
  seconds = Math.round(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = seconds % 60;
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};


export function timesAgo(dateString) {
  const now = new Date();
  const inputDate = new Date(dateString);
  const diffInMs = now - inputDate; // Difference in milliseconds

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 1) {
    return "just now";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
  if (diffInDays === 1) {
    return "yesterday";
  }
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}
