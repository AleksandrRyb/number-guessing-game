import firebase from "firebase/app";
import { firebaseApp } from "../init";
import { Profile } from "../../types/profile.types";

const db = firebaseApp.firestore();

export async function createGame(profile: Profile) {
  const documentRef = await db.collection("games").add({
    owner: profile,
    gameState: "creating",
  });

  return documentRef.id;
}

export async function addPlayerToGame(profile: Profile, gameId: string) {
  const documentRef = await db
    .collection("games")
    .doc(gameId)
    .collection("players")
    .add({
      profile,
      gameId,
      movePoints: 10,
      guessed: 0,
    });

  return documentRef.id;
}
