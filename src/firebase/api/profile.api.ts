import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();

  return snapshot;
}

export async function createProfile(user: firebase.User) {
  const { uid, displayName, photoURL, email } = user;
  const snapshot = await db.collection("profile").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    email: email,
    wins: 0,
    loses: 0,
  });

  return snapshot;
}

export async function updateProfile(profileId: string, result: "win" | "lose") {
  if (result === "win") {
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
