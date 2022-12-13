import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Globals from '../Globals';

export default function DiscussionInput(props: any) {

    var [inputErr, setInputErr]: any = useState([''])

    const replyInput = useRef(null)
    const inputref = useRef<any>(null)

    const handleClick = () => {
        if (inputref.current == null) {
            return
        }
        var input = inputref.current.value

        if (input.replace(/\s/g, '') == '') {
            setInputErr('Toto pole nesmí být prázdné')
            return;
        } else {
            setInputErr('')
        }
        var payload = {}
        if (props.parentComment) {
            payload = { text: input, parentCommentId: props.parentComment }
        } else {
            payload = { text: input }
        }


        inputref.current.value = ''
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        fetch(Globals.BACKEND_URL + 'listings/' + props.listingID + '/', requestOptions)
            .then(() => props.fetchData())
    }

    return (
        <div className={props.classes.container} style={{ marginLeft: "4vw", paddingTop: "1vw", paddingBottom: "0" }}>
            <TextField error={inputErr != ''} helperText={inputErr} id="message" name='message' rows={2} inputRef={inputref} style={{ width: "100%", resize: "none" }} onChange={()=>setInputErr('')} inputProps={{maxLength: Globals.CONSTRAINTS.COMMENTMAXLEN}}/>
            <Button onClick={handleClick}>Post</Button>
        </div>
    )
}
