export async function uploadPictures(picture: File) {
  const formData = new FormData();
  formData.append("picture", picture);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'upload de l'image");
  }

  const uploadResult = await response.json();
  const pictureUrl = uploadResult.url;

  return pictureUrl;
}
