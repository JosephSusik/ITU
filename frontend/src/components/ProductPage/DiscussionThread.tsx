import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

export default function DiscussionThread(props: any) {
  const d = new Date(props.comment.createdOn)
  const createdDate = d.toLocaleString('cs-CZ')
  return (
    <>
      <div style={{ padding: "1vw", paddingTop: "2px", backgroundColor: "white", border: "2px solid black", borderRadius: "8px", marginLeft:props.level * 2 + "vw", marginBottom: "1vw", marginRight: "1vw" }}>
        <p>{props.comment.author.name + ' ' + props.comment.author.surname + ' - ' + createdDate}</p>
        <p>{props.comment.text}</p>
      </div>
      {props.comments.map((comment: any) =>
        comment.parentComment == props.comment.id &&
        <DiscussionThread comment={comment} comments={props.comments} level={props.level+1} />
      )}
    </>
  )
}
