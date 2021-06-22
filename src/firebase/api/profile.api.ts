import firebase from "firebase/app";
import { firebaseApp } from "../init";
import { FIREBASE_COLLECTIONS } from "../collections";

const db = firebaseApp.firestore();

export async function getProfile(user: firebase.User) {
  const profileSnapshot = await db
    .collection(FIREBASE_COLLECTIONS.PROFILES)
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
  const profileRef = await db.collection(FIREBASE_COLLECTIONS.PROFILES).add({
    userId: uid,
    name: displayName,
    avatar: photoURL,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    email: email,
    wins: 0,
    loses: 0,
    currentGame: null,
  });
  const newProfile = {
    id: profileRef.id,
    ...(await profileRef.get()).data(),
  };
  return newProfile;
}

export async function updateProfileScore(profileId: string, isWinner: boolean) {
  const updatedProfile = await db
    .collection(FIREBASE_COLLECTIONS.PROFILES)
    .doc(profileId)
    .update({
      [isWinner ? "wins" : "loses"]: firebase.firestore.FieldValue.increment(1),
    })
    .then(() => true)
    .catch(() => false);

  return updatedProfile;
}

export async function updateProfileCurrentGame(
  profileId: string,
  gameId: string | null
) {
  const updatedProfile = await db
    .collection(FIREBASE_COLLECTIONS.PROFILES)
    .doc(profileId)
    .update({
      currentGame: gameId,
    })
    .then(() => true)
    .catch(() => false);

  return updatedProfile;
}
