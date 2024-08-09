import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadImageToFirebaseStorage(photo: File) {
  try {
    const allowedFormats = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedFormats.includes(photo.type)) {
      throw new Error("Invalid image format. Only JPEG, WEBP, and PNG are allowed.");
    }

    const storageRef = ref(storage, 'images/' + photo.name);
    const snapshot = await uploadBytes(storageRef, photo);
    console.log(snapshot);

    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Failed to upload image to Firebase Storage:", error);
    throw error;
  }
}

