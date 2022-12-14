/**
 * File: DiscussionInput.tsx
 * Author: Leopold Nemček <xnemce07>
 * Brief: Component for adding new reply to discussion, or starting a new thread
 */

import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Globals from '../Globals';
import ThemedTextInput from '../themedInputFields/ThemedTextInput';

export default function DiscussionInput(props: any) {

    var [inputErr, setInputErr]: any = useState([''])

    
    const inputref = useRef<HTMLInputElement>(null)

    /**
     * Detect enter key and send data
     */
    const handleKeyPress = (event:any) => {
        if(event.keyCode == 13){
            handleSend()
        }
    }

    /**
     * Checking for validity of input, if valid, send data and update, if not, set error message
     */
    const handleSend = () => {
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


        //Clear the input field on sending
        inputref.current.value = ''
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        if(props.replyHandler){
            props.replyHandler(0)
        }
        fetch(Globals.BACKEND_URL + 'listings/' + props.listingID + '/', requestOptions)
            .then(() => props.fetchData())
    }

    return (
        <div className={props.classes.container} style={{ marginLeft: (props.parentComment? "8vw" : "2vw"), paddingTop: "1vw", paddingBottom: "0" }}>
            {!props.parentComment && <h3>Přidat příspěvek</h3>}
            <TextField 
            autoFocus={props.parentComment} 
            error={inputErr != ''} 
            onKeyDown={handleKeyPress} 
            helperText={inputErr}
            rows={2} 
            inputRef={inputref} 
            style={{ width: "100%", resize: "none" }} 
            onChange={()=>setInputErr('')} 
            inputProps={{maxLength: Globals.CONSTRAINTS.COMMENTMAXLEN}}
            />
            <button className='button'  style={{marginTop:"0.6vw", marginBottom:"0.6vw"}} onClick={handleSend}>Odeslat</button>
        </div>
    )
}
