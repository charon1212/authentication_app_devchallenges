import { storage } from "./firebase";

/**
 * ユーザーのAvatar画像を更新する。
 * firebaseのstorageを上書きするため、この操作が完了すると戻せない。
 *
 * @param file 画像ファイル
 * @param userUid ユーザーのfirebaseで裁判したUID
 */
const uploadAvatarImage = (file: File, userUid: string) => {
  const uploadFileName = 'AvatarImage' + userUid;
  return storage.ref().child('users').child('avatar')
    .child(uploadFileName)
    .put(file);
};

export default uploadAvatarImage;