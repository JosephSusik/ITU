import React, { useState, useEffect, useRef } from "react";
import Globals from "../Globals";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles({
  postRatingSection: {
    backgroundColor: Globals.COLORS.MAIN2,
    borderRadius: "8px",
    paddingTop: "1vw",
    paddingBottom: "1vw",
    border: "2px solid black",
  },
  container: {
    position: "relative",
    padding: "1vw",
    paddingTop: "2px",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "8px",
    marginBottom: "0.3vw",
    marginRight: "1vw",
    marginLeft: "2vw",
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  topRightIconless: {
    position: "absolute",
    top: "0.5vw",
    right: "0.5vw",
  },
  bottomRight: {
    position: "absolute",
    right: "0.5vw",
    bottom: "0.5vw",
  },
});

function UserRatings({ userRatings }: any) {
  // console.log(userRatings);

  var [ratingValue, setRatingValue]: any = useState(3);

  const valueRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  const classes = useStyles();

  const handlePostRating = () => {
    console.log("handlePostRating")
    console.log("val: " + valueRef.current.value)
    console.log("text: " + textRef.current.value)
  };

  return (
    <>
      <div className={classes.postRatingSection}>
        <div className={classes.container}>
          <h3>Přidat recenzi</h3>
          <TextField
            id="rating-text"
            name="rating-text"
            rows={2}
            inputRef={textRef}
            style={{ width: "100%", resize: "none" }}
            inputProps={{ maxLength: Globals.CONSTRAINTS.COMMENTMAXLEN }}
          />
          <input
            name="rating-value-input"
            type="number"
            value={ratingValue}
            ref={valueRef}
            hidden
            readOnly
          />
          <Rating
            name="simple-controlled"
            value={ratingValue}
            precision={1}
            onChange={(event: any, newValue: any) => {
              setRatingValue(newValue);
            }}
          />
          <button
            className="button"
            style={{ marginTop: "0.6vw", marginBottom: "0.6vw" }}
            onClick={handlePostRating}
          >
            Odeslat
          </button>
        </div>
        {userRatings &&
          userRatings.map((rating: any) =>
            <div className={classes.container}>rating placeholder</div>
          )
        }
      </div>
    </>
  );
}

export default UserRatings;
