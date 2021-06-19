//@ts-nocheck
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const checkWinner = functions.https.onRequest(
  async (request, response) => {
    try {
      const gameId = request.path.substring(1);
      const playersSnapshot = await db
        .collection("games")
        .doc(gameId)
        .collection("players")
        .get();
      const players = playersSnapshot.docs.map(function (doc) {
        return { id: doc.id, ...doc.data() };
      });

      if (!players.length) {
        return response.status(404).json({ error: "users not found" });
      }

      //Find the player with the biggest guessed count
      const winner = players.reduce((p1, p2) =>
        p1.guessed > p2.guessed ? p1 : p2
      );

      //If we found 1, we change gameState
      const response = await db
        .collection("games")
        .doc(winner.gameId)
        .update({
          winner: winner,
          stages: "done",
        })
        .then(() => {
          return { message: "Winner is updated" };
        })
        .catch(() => {
          return { error: "Winner is not updated" };
        });

      response.status(200).json(response);
    } catch (error) {
      response.status(400).json({ error: "Unhandeled error!" });
    }
  }
);
