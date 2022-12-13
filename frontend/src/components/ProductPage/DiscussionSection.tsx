import React, { useState } from "react";
import Globals from '../Globals'
import DiscussionThread from './DiscussionThread'

export default function DiscussionSection(props:any) {
  var [replyId, setReplyId]: any = useState([0]);

  const handlereplyIdChange = (id: number) => {
    if( id == replyId){
      setReplyId(0)
    } else {
      setReplyId(id)
    }
  }

  return (
    <div style={{backgroundColor:Globals.COLORS.MAIN2, borderRadius:"8px", paddingTop:"1vw", paddingBottom:"1vw", border:"2px solid black"}}>
        {props.comments.map((comment:any)=>
        comment.parentComment == null &&
            <DiscussionThread OpId={props.OpId} comment={comment} comments={props.comments} level={1} replyID={replyId} replyHandler={handlereplyIdChange} fetchData={props.fetchData}/>
        )}
    </div>
  )
}
