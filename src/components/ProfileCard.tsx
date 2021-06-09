//@ts-nocheck
import React from "react";
import firebase from "firebase";

import { Card, CardHeader, CardContent, SkeletonBlock } from "framework7-react";

type User = {
  user: firebase.User | null;
};

function ProfileCard({ user }: User) {
  if (!user) {
    return (
      <SkeletonBlock
        className="margin-bottom"
        effect="wave"
        width="350px"
        height="320px"
        borderRadius="10px"
        style={{
          margin: "0 auto",
        }}
      />
    );
  }
  return (
    <Card className="display-inline-block" style={{ minWidth: 350 }}>
      <CardHeader className="display-block">
        <img
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
          }}
          alt="player name"
          src={user?.photoURL}
        />
      </CardHeader>

      {/* Player Info */}
      <CardContent>
        <div
          style={{
            fontSize: 25,
            color: "black",
          }}
        >
          {user?.displayName?.toUpperCase()}
        </div>
        <span className="margin-right">Wins: 6</span>
        <span>Loses: 1</span>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
