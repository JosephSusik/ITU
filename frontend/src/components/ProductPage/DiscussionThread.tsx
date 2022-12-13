import React, { useState } from "react";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import DiscussionReply from "./DiscussionReply";
import DiscussionInput from "./DiscussionInput";
import { Button } from '@mui/material';
import Globals from "../Globals";
import DiscussionMenu from "./DiscussionMenu";

const useStyles = makeStyles({
  container: {
    position: 'relative',
    padding: "1vw",
    paddingTop: "2px",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "8px",
    marginBottom: "1vw", 
    marginRight: "1vw",
    marginLeft: "2vw"
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  topRightIconless: {
    position: 'absolute',
    top: "0.5vw",
    right: "0.5vw",
  }
});

export default function DiscussionThread(props: any) {
  var [expand, setExpand]: any = useState([true]);

  const classes = useStyles()

  const handleExpandClick = () => {
    setExpand(!expand)
    if ( expand && props.replyID == props.comment.id){
      props.replyHandler(0)
    }
  }

  const handleReplyClick = () => {
    props.replyHandler(props.comment.id)
  }

  const d = new Date(props.comment.createdOn)
  const createdDate = d.toLocaleString('cs-CZ')
  return (
    <>
      <div className={classes.container} >
        <div>
          {props.comment.author.name + ' ' + props.comment.author.surname} <DiscussionMenu deletable={Globals.CURRENT_USER_ID == props.comment.author.id} fetchData={props.fetchData} commentId={props.comment.id} />
        </div>
        <div className={props.level == 1 ? classes.topRight : classes.topRightIconless}>
          <div onClick={handleExpandClick} >
            {createdDate}
            {props.level == 1 && (expand ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </div>

        </div>
        <p>{props.comment.text}</p>
        {props.level == 1 && //TODO: CHECK FOR CHILD COMMENTS
          <Button onClick={handleReplyClick} >ODPOVEDET</Button>
        }
      </div>
      {props.replyID == props.comment.id && <DiscussionInput classes={classes} listingID={props.comment.listing} fetchData={props.fetchData} parentComment={props.comment.id}/>}

      {expand && props.comments.map((comment: any) =>
        comment.parentComment == props.comment.id &&
        <DiscussionReply comment={comment} classes={classes} OpId={props.OpId} fetchData={props.fetchData}/>
      )}
    </>
  )
}
