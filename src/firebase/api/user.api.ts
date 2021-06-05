import firebase from "firebase/app";
import { firebaseApp } from "../init";

const auth = firebaseApp.auth();

export interface SubscribeUser {
  (user: firebase.User | null): void;
}

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
}

export function checkAuth(callback: SubscribeUser) {
  const subscribeUser = auth.onAuthStateChanged(callback);
  return subscribeUser;
}

export async function logOut() {
  await auth.signOut();
  window.location.reload();
}
