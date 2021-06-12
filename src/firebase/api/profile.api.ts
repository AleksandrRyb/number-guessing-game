import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();

  if (snapshot.size !== 0) {
    const profile = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };

    return profile;
  }

  const { uid, displayName, photoURL, email } = user;
  const documentRef = await db.collection("profiles").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    documentRef: firebase.firestore.FieldValue.serverTimestamp(),
    email: email,
    wins: 0,
    loses: 0,
  });
  const newProfile = {
    id: documentRef.id,
    ...(await documentRef.get()).data(),
  };
  return newProfile;
}

export async function updateProfile(profileId: string, isWinner: boolean) {
  const updatedProfile = await db
    .collection("profiles")
    .doc(profileId)
    .update({
      [isWinner ? "wins" : "loses"]: firebase.firestore.FieldValue.increment(1),
    })
    .then(() => true)
    .catch(() => false);

  return updatedProfile;
}
