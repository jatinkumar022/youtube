// Function to generate an avatar as an image file
export const generateAvatar = async (fullName) => {
  // Trim the name and split into parts
  const name = fullName.trim();
  const nameParts = name.split(" ");

  // Determine initials
  let initials;
  if (nameParts.length === 1) {
    // If only one name, use the first two letters
    initials = name.slice(0, 2).toUpperCase();
  } else {
    // Otherwise, use the first letter of the first two words
    initials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }

  // Generate a URL from UI Avatars API based on initials
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&length=2&background=random&color=fff&font-size=0.33&rounded=true`;

  // Fetch the image from the URL
  const response = await fetch(avatarUrl);
  if (!response.ok) {
    throw new Error("Failed to download the avatar image.");
  }

  // Convert the response into a Blob
  const blob = await response.blob();

  // Create a file object from the Blob
  const fileName = `${name.replace(/\s/g, "_")}_avatar.jpg`;
  const file = new File([blob], fileName, { type: "image/jpeg" });

  return file;
};
