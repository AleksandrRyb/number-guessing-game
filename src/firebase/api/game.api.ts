import firebase from "firebase/app";
import { firebaseApp } from "../init";
import { Profile } from "../../types/profile.types";
import { FIREBASE_COLLECTIONS } from "../collections";

const db = firebaseApp.firestore();

export async function createGame(profile: Profile) {
  const newGameRef = await db.collection(FIREBASE_COLLECTIONS.GAMES).add({
    owner: profile,
    gameState: "creating",
  });

  return newGameRef.id;
}

export async function addPlayerToGame(profile: Profile, gameId: string) {
  const newPlayerRef = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .add({
      profile,
      gameId,
      movePoints: 10,
      guessed: 0,
    });

  return newPlayerRef.id;
}
