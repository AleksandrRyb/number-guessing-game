import firebase from "firebase/app";
import { Profile } from "../../types/profile.types";
import { firebaseApp } from "../init";

const db = firebaseApp.firestore();

export async function createInvite(
  sendFrom: Profile,
  sendTo: string,
  gameUrl: string,
  message: string
) {
  const response = await db.collection("invites").add({
    sendFrom,
    sendTo,
    gameUrl,
    message,
    joined: false,
    isReceived: false,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return response.id;
}
