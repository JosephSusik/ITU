import React from 'react'
import Globals from '../Globals'
import DiscussionThread from './DiscussionThread'

export default function DiscussionSection(props:any) {
  return (
    <div style={{backgroundColor:Globals.COLORS.MAIN2, borderRadius:"8px", paddingTop:"1vw", paddingBottom:"1vw"}}>
        {props.comments.map((comment:any)=>
        comment.parentComment == null &&
            <DiscussionThread comment={comment} comments={props.comments} level={1}/>
        )}
    </div>
  )
}
