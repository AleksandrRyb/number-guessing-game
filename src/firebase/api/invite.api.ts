import firebase from "firebase/app";
import { Profile } from "../../types/profile.types";
import { validateEmail } from "../../helpers/invite.helpers";
import { firebaseApp } from "../init";
import { FIREBASE_COLLECTIONS } from "../collections";

const db = firebaseApp.firestore();

export async function createInvite(
  sendFrom: Profile,
  sendFromId: string,
  sendTo: string,
  gameId: string,
  message: string
) {
  const emailIsValid = validateEmail(sendTo);

  if (!emailIsValid) {
    return { error: "Email is not valid!" };
  }

  const existedProfileData = await db
    .collection(FIREBASE_COLLECTIONS.PROFILES)
    .where("email", "==", sendTo)
    .get();

  if (!existedProfileData.docs[0]?.id) {
    return { error: `User with email: ${sendTo} does not exists` };
  }

  const inviteDocData = await db
    .collection(FIREBASE_COLLECTIONS.INVITES)
    .where("sendFromId", "==", sendFromId)
    .where("sendTo", "==", sendTo)
    .where("gameId", "==", gameId)
    .get();

  if (inviteDocData.docs[0]?.id) {
    return { error: `You already sent the message to this user: ${sendTo}` };
  }

  const newInviteRef = await db.collection(FIREBASE_COLLECTIONS.INVITES).add({
    sendFrom,
    sendFromId,
    sendTo,
    gameId,
    message,
    joined: false,
    isReceived: false,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

  if (newInviteRef.id) {
    return { message: "Your message successfully sent!" };
  }

  return { error: "Unhandeled error during the sending." };
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
