import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  const profileSnapshot = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();

  if (profileSnapshot.size !== 0) {
    const profile = {
      id: profileSnapshot.docs[0].id,
      ...profileSnapshot.docs[0].data(),
    };

    return profile;
  }

  const { uid, displayName, photoURL, email } = user;
  const profileRef = await db.collection("profiles").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    email: email,
    wins: 0,
    loses: 0,
  });
  const newProfile = {
    id: profileRef.id,
    ...(await profileRef.get()).data(),
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
