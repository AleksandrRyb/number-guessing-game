import firebase from "firebase/app";
import { Profile } from "../../types/profile.types";
import { firebaseApp } from "../init";
import { FIREBASE_COLLECTIONS } from "../collections";
import { Invite } from "../../types/invite.types";

const db = firebaseApp.firestore();

export async function createInvite(
  sendFrom: Profile,
  sendTo: string,
  gameUrl: string,
  message: string
) {
  const newInviteRef = await db.collection(FIREBASE_COLLECTIONS.INVITES).add({
    sendFrom,
    sendTo,
    gameUrl,
    message,
    joined: false,
    isReceived: false,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return newInviteRef.id;
}

export function subscribeToInvites(
  profile: Profile,
  callback: {
    next: (querySnapshot: firebase.firestore.QuerySnapshot) => void;
  }
) {
  return db
    .collection(FIREBASE_COLLECTIONS.INVITES)
    .where("sendTo", "==", profile.email)
    .where("isReceived", "==", false)
    .orderBy("created", "asc")
    .onSnapshot(callback);
}

export async function replyToInvite(inviteId: string, joined: boolean) {
  const inviteReply = await db
    .collection(FIREBASE_COLLECTIONS.INVITES)
    .doc(inviteId)
    .update({
      isReceived: true,
      joined,
    })
    .then(() => true)
    .catch(() => false);

  return inviteReply;
}
