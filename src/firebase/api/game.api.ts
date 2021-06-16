import firebase from "firebase/app";
import { firebaseApp } from "../init";
import { Profile } from "../../types/profile.types";
import { FIREBASE_COLLECTIONS } from "../collections";

const db = firebaseApp.firestore();

export async function createGame(profile: Profile) {
  const newGameRef = await db.collection(FIREBASE_COLLECTIONS.GAMES).add({
    owner: profile,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    gameState: "creating",
  });

  if (newGameRef.id) {
    const gameSnapshot = await db
      .collection(FIREBASE_COLLECTIONS.GAMES)
      .doc(newGameRef.id)
      .get();
    const gameData = { id: gameSnapshot.id, ...gameSnapshot.data() };
    return gameData;
  }
}

export async function addPlayerToGame(profile: Profile, gameId: string) {
  const newPlayerRef = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .add({
      profileId: profile.id,
      profile: profile,
      gameId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      movePoints: 10,
      guessed: 0,
    });

  return newPlayerRef.id;
}

export function subscribeToPlayers(
  gameId: string,
  callback: {
    next: (querySnapshot: firebase.firestore.QuerySnapshot) => void;
  }
) {
  db.collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .orderBy("created", "desc")
    .onSnapshot(callback);
}
