import firebase from "firebase/app";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  //try to get existed profile if it exists
  const response = await db
    .collection("profiles")
    .where("userId", "==", user.uid)
    .get();

  if (response.size !== 0) {
    const existedProfile = {
      id: response.docs[0].id,
      ...response.docs[0].data(),
    };

    return existedProfile;
  }

  // if in not, create new profile
  const { uid, displayName, photoURL, email } = user;
  const newData = await db.collection("profiles").add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    email: email,
    wins: 0,
    loses: 0,
  });
  const newProfile = { id: newData.id, ...(await newData.get()).data() };
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
