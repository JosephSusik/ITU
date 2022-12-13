import React, { useState } from "react";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DiscussionReply from "./DiscussionReply";
import DiscussionInput from "./DiscussionInput";
import { Button } from '@mui/material';
import Globals from "../Globals";
import DiscussionMenu from "./DiscussionMenu";
import IconButton from '@mui/material/IconButton';



export default function DiscussionThread(props: any) {
  var [expand, setExpand]: any = useState([true]);

  const classes = props.classes

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
          {props.comment.author.name + ' ' + props.comment.author.surname} 
        </div>
        <div className={props.level == 1 ? classes.topRight : classes.topRightIconless}>
          <div  >
            {createdDate}
            <DiscussionMenu deletable={Globals.CURRENT_USER_ID == props.comment.author.id} fetchData={props.fetchData} commentId={props.comment.id} />
            {/* {props.level == 1 && (expand ? <ExpandLessIcon onClick={handleExpandClick}/> : <ExpandMoreIcon onClick={handleExpandClick}/>)} */}
            <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={handleExpandClick}
            >
                {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>

        </div>
        <p>{props.comment.text}</p>
        {props.level == 1 && //TODO: CHECK FOR CHILD COMMENTS
          <Button onClick={handleReplyClick} >přidat opověd</Button>
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
