import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  const existedData = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();
  const existedProfile = {
    id: existedData.docs[0].id,
    ...existedData.docs[0].data(),
  };
  if (existedProfile) {
    return existedProfile;
  }

  const { uid, displayName, photoURL, email } = user;
  const newData = await db.collection("profiles").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    email: email,
    wins: 0,
    loses: 0,
  });
  const newProfile = { id: newData.id, ...(await newData.get()).data() };
  return newProfile;
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

  const data = await db.collection("profiles").doc(profileId).get();
  const updatedProfile = { id: data.id, ...data.data() };
  return updatedProfile;
}
