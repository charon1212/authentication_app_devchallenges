import { storage } from "./firebase";

const uploadFile = (file: File, userUid: string) => {
  const uploadFileName = 'AvatarImage' + userUid;
  return storage.ref().child('users').child('avatar')
    .child(uploadFileName)
    .put(file);
};

export default uploadFile;