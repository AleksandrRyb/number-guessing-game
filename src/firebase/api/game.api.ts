import firebase from "firebase/app";
import { firebaseApp } from "../init";
import { Profile } from "../../types/profile.types";
import { GameState } from "../../types/game.types";
import { FIREBASE_COLLECTIONS } from "../collections";

const db = firebaseApp.firestore();

export async function createGame(profile: Profile) {
  const newGameRef = await db.collection(FIREBASE_COLLECTIONS.GAMES).add({
    owner: profile,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    winner: null,
    stages: "creating",
    gameState: {
      currentPlayer: null,
      nextPlayer: null,
      isEven: null,
    },
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
  const playerDoc = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .where("profileId", "==", profile.id)
    .get();

  if (playerDoc.docs.length) {
    return playerDoc.docs[0].id;
  }

  const newPlayerRef = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .add({
      profileId: profile.id,
      profile: profile,
      gameId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      movePoints: 3,
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
    .orderBy("created", "asc")
    .onSnapshot(callback);
}

export function subscribeToGame(
  gameId: string,
  callback: {
    next: (snapshot: firebase.firestore.DocumentSnapshot) => void;
  }
) {
  db.collection(FIREBASE_COLLECTIONS.GAMES).doc(gameId).onSnapshot(callback);
}

export async function updateGameState(gameId: string, gameState: GameState) {
  const gameStateResponse = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .update({
      stages: "in-progress",
      gameState: {
        ...gameState,
      },
    })
    .then(() => true)
    .catch(() => false);

  return gameStateResponse;
}

export async function updatePlayer(
  gameId: string,
  playerId: string,
  field: { key: number }
) {
  const playerUpdateResponse = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .doc(playerId)
    .update({
      ...field,
    })
    .then(() => true)
    .catch(() => false);

  return playerUpdateResponse;
}

export async function setWinner(gameId: string) {
  const response = await fetch(
    `http://localhost:5001/number-guessing-game-644c8/us-central1/checkWinner/${gameId}`
  )
    .then((res) => res)
    .catch((error) => error);

  return response;
}

export async function getAllPlayers(gameId: string) {
  const playersSnapshot = await db
    .collection(FIREBASE_COLLECTIONS.GAMES)
    .doc(gameId)
    .collection(FIREBASE_COLLECTIONS.PLAYERS)
    .get();

  const players = playersSnapshot.docs.map((player) => ({
    id: player.id,
    ...player.data(),
  }));

  return players;
}
