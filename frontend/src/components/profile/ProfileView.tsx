import React , { useState, useEffect } from "react";
import "../../index.css";
import UserPreview from "./UserPreview";
import WarningIcon from "@mui/icons-material/Warning"
import ClassIcon from "@mui/icons-material/Class"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ProfileView({ userData }: any) {

    const handleFavoriteClick = () => {

    }

    return (
        <>
            <div className="profile_preview" style={{ marginBottom: "10px" }}>
                <UserPreview userId={userData.id} userData={userData} />
            </div>
            <div className="profile_main">
                {!userData.isFavorite ?
                    <p onClick={handleFavoriteClick} style={{cursor: "pointer"}}><FavoriteBorderIcon/>Přidat do oblíbených</p> :
                    <p onClick={handleFavoriteClick} style={{cursor: "pointer"}}><FavoriteIcon/>Odebrat z oblíbených</p>
                }
                <p style={{cursor: "pointer"}}><ClassIcon color="warning" />Zobrazit kontakt</p>
                <p style={{cursor: "pointer"}}><WarningIcon color="error" />Nahlásit užívatele</p>
            </div>
        </>
    );
}

export default ProfileView;