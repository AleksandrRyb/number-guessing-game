import firebase from "firebase/app";
import { firebaseApp } from "../init";

const auth = firebaseApp.auth();

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const response = await auth
    .signInWithPopup(provider)
    .then((response) => response)
    .catch(() => "Login related error, try later");
  return response;
}

export function checkAuth(callback: (user: firebase.User | null) => void) {
  return auth.onAuthStateChanged(callback);
}

export async function logOut() {
  await auth.signOut();
}
