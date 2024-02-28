import firebasedb from "./firebaseDB";
import { getStorage } from "firebase/storage";

const storage = getStorage(firebasedb.firebaseApp);

export default storage;
