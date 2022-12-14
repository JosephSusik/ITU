import React , { useState, useEffect } from "react";
import "../../index.css";
import UserPreview from "./UserPreview";
import WarningIcon from "@mui/icons-material/Warning"
import ClassIcon from "@mui/icons-material/Class"
import { Link, useParams } from "react-router-dom";

function ProfileView({ userData }: any) {
    return (
        <>
            <div className="profile_preview" style={{ marginBottom: "5px" }}>
                <UserPreview userId={userData.id} userData={userData} />
            </div>
            <div className="profile_main">
                {/* {!item.isFavorite ?
                    <p onClick={handleFavoriteClick} style={{cursor: "pointer"}}><FavoriteBorderIcon/>Přidat do oblíbených</p> :
                    <p onClick={handleFavoriteClick} style={{cursor: "pointer"}}><FavoriteIcon/>Odebrat z oblíbených</p>
                } */}
                <p style={{cursor: "pointer"}}><ClassIcon color='warning' />Zobrazit kontakt</p>
                <p style={{cursor: "pointer"}}><WarningIcon color='error' />Nahlásit užívatele</p>
            </div>
        </>
    );
}

export default ProfileView;