import { User } from "../../features/user/userSlice";
import { auth, db } from "./firebase";

const fieldBio = 'bio'
const fieldPhoneNumber = 'phoneNumber'

type UserInfo = {
  photoUrl?: string,
  displayName?: string,
  bio?: string,
  phoneNumber?: string,
  email?: string,
  password?: string
}

/**
 * Firestoreからユーザー情報を取得する。
 *
 * このメソッドはfirestoreのobserverに処理を依頼するまでで、実際に取得できるのはこのメソッドが呼び出された後になる。
 *
 * @param user reduxで管理しているUserオブジェクト
 * @param handler Firestoreからユーザー情報を取得したときの処理
 * @param errorHandler Firestoreから取得する処理に失敗したときの処理
 * @returns unsubscription
 */
export const getUserInfo = (user: User, handler: (userInfo:UserInfo) => void, errorHandler: (error:firebase.default.firestore.FirestoreError) => void) => {

  const userDoc = db.collection('users').doc(user.uid);
  const unSub = userDoc.onSnapshot(
    (snapshot) => {
      let userInfo: UserInfo = {
        photoUrl: user.photoUrl,
        displayName: user.displayName,
        email: user.email
      }
      if (snapshot.exists) {
        userInfo.bio = snapshot.get(fieldBio);
        userInfo.phoneNumber = snapshot.get(fieldPhoneNumber);
      }
      handler(userInfo);
    },
    (error) => errorHandler(error)
  );

  return unSub;

}

/**
 * ユーザー情報を更新する。
 *
 * @param uid ユーザーのuid
 * @param userInfo 更新後のユーザー情報。
 * @returns Promise
 */
export const updateUserInfo = (uid: string, userInfo: UserInfo) => {

  console.log(userInfo);
  console.log(auth.currentUser);

  if(!auth.currentUser) return;

  const userDoc = db.collection('users').doc(uid);
  const newProfile = {
    displayName: userInfo.displayName,
    photoURL: userInfo.photoUrl
  }
  const newUserDoc = {
    [fieldBio]: userInfo.bio,
    [fieldPhoneNumber]: userInfo.phoneNumber
  }
  const promiseSet: Promise<any>[] = [
    auth.currentUser.updateProfile(newProfile),
    userDoc.set(newUserDoc)
  ];
  userInfo.email && promiseSet.push(auth.currentUser.updateEmail(userInfo.email));
  userInfo.password && promiseSet.push(auth.currentUser.updatePassword(userInfo.password));

  return Promise.all(promiseSet);

}
