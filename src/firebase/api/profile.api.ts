import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  //try to get existed profile if it exists
  const existed = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();

  if (existed.size !== 0) {
    const profile = {
      id: existed.docs[0].id,
      ...existed.docs[0].data(),
    };

    return profile;
  }

  // if in not, create new profile
  const { uid, displayName, photoURL, email } = user;
  const created = await db.collection("profiles").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    email: email,
    wins: 0,
    loses: 0,
  });
  const newProfile = { id: created.id, ...(await created.get()).data() };
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
