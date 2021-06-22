import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

enum FIREBASE_COLLECTIONS {
  GAMES = "games",
  PLAYERS = "players",
}

enum GAME_STAGES {
  CREATING = "creating",
  IN_PROGRESS = "in-progress",
  DONE = "done",
  CLOSED = "closed",
}

type Profile = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  email: string;
  wins: number;
  loses: number;
  created: Date;
};

type Player = {
  id: string;
  profileId: string;
  profile: Profile;
  gameId: string;
  created: Date;
  movePoints: number;
  guessed: number;
};

export const setWinner = functions.https.onRequest(
  async (req: any, res: any) => {
    const response = res.set("Access-Control-Allow-Origin", "*");

    try {
      const gameId = req.path.substring(1);
      const playersSnapshot = await db
        .collection(FIREBASE_COLLECTIONS.GAMES)
        .doc(gameId)
        .collection(FIREBASE_COLLECTIONS.PLAYERS)
        .get();
      const players = playersSnapshot.docs.map(function (doc) {
        return { id: doc.id, ...doc.data() } as Player;
      });

      if (!players.length) {
        return response.status(404).json({ error: "users not found" });
      }

      //Find the player with the biggest guessed count
      const winner = players.reduce((p1, p2) =>
        //@ts-ignore
        p1.guessed > p2.guessed ? p1 : p2
      );

      //If we found 1, we change gameState
      const winnerRef = await db
        .collection(FIREBASE_COLLECTIONS.GAMES)
        .doc(winner.gameId)
        .update({
          winner: winner,
          stages: GAME_STAGES.DONE,
        })
        .then(() => {
          return { message: "Winner is updated" };
        })
        .catch(() => {
          return { error: "Winner is not updated" };
        });

      response.status(200).json(winnerRef);
    } catch (error) {
      response.status(400).json({ error: "Unhandeled error!" });
    }
  }
);
