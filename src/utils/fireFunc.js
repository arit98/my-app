import { doc, setDoc } from "firebase/firestore";
import { firebase } from "./config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firebase, "dataList", `${Date.now()}`), data, {
    merge: true,
  });
};
