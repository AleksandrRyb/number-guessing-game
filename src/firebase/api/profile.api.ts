import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  const existedProfile = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();
  if (existedProfile) {
    return existedProfile;
  }

  const { uid, displayName, photoURL, email } = user;
  const profile = await db.collection("profiles").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    email: email,
    wins: 0,
    loses: 0,
  });

  return profile;
}

export async function updateProfile(profileId: string, isWinner: boolean) {
  if (isWinner) {
    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        wins: firebase.firestore.FieldValue.increment(1),
      });
  } else {
    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        loses: firebase.firestore.FieldValue.increment(1),
      });
  }
}
