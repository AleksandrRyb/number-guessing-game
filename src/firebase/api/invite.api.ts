import firebase from "firebase/app";
import { Profile } from "../../types/profile.types";
import { firebaseApp } from "../init";
import { Invite } from "../../types/invite.types";

const db = firebaseApp.firestore();

export async function createInvite(
  sendFrom: Profile,
  sendTo: string,
  gameUrl: string,
  message: string
) {
  const documentRef = await db.collection("invites").add({
    sendFrom,
    sendTo,
    gameUrl,
    message,
    joined: false,
    isReceived: false,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return documentRef.id;
}

export function subscribeToInvites(
  profile: Profile,
  callback: {
    next: (querySnapshot: firebase.firestore.QuerySnapshot) => void;
  }
) {
  return db
    .collection("invites")
    .where("sendTo", "==", profile.email)
    .where("isReceived", "==", false)
    .orderBy("created", "asc")
    .onSnapshot(callback);
}

export async function replyToInvite(inviteId: string, joined: boolean) {
  const response = await db
    .collection("invites")
    .doc(inviteId)
    .update({
      isReceived: true,
      joined,
    })
    .then(() => true)
    .catch(() => false);

  return response;
}
