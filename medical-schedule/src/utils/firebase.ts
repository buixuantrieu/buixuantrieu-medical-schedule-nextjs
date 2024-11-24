/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "@/lib/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

const uploadImageFireBase = async (file: any) => {
  const uniqueName = `${uuid()}_${file.name}`;
  const storageRef = ref(storage, `hellobacsi/${uniqueName}`);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};
const deleteImageFireBase = async (path: string) => {
  const decodedUrl = decodeURIComponent(path);
  const storagePath = decodedUrl.split("hellobacsi/")[1].split("?")[0];
  const storageRef = ref(storage, `hellobacsi/${storagePath}`);
  await deleteObject(storageRef);
};

export { uploadImageFireBase, deleteImageFireBase };
