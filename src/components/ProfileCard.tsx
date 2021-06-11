import React from "react";
import { Profile } from "../types/profile.types";

import { Card, CardHeader, CardContent, SkeletonBlock } from "framework7-react";

type IProfile = {
  profile: Profile | null;
};

function ProfileCard({ profile }: IProfile) {
  if (!profile) {
    return (
      <SkeletonBlock
        tag="div"
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
          src={profile?.avatar}
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
          {profile?.name.toUpperCase()}
        </div>
        <span className="margin-right">Wins: {profile.wins}</span>
        <span>Loses: {profile.loses}</span>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
