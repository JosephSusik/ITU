/**
 * File: ImagePreview.tsx
 * Author: Leopold Nemček <xnemce07>
 * Brief: Component for rendering small image icons used in ListingPage
 */

import React from 'react'
import { Container } from "@mui/system"


function ImagePreview(props: any) {
    
    var border = "0px"

    if (props.image.id == props.mainImgID) {
        border = "5px solid green"
    }

    /**
     * Set this preview as main image
     */
    const handleClick = (event:any) => {
        props.handle(props.image.id, props.image.path)
    }

    return (
        <Container key={props.image} fixed style={{ maxWidth: "100%", marginRight:0, marginLeft:"auto"}}>
            <img src={props.image.path} style={{ maxWidth: "100%", border:border, marginRight:0, marginLeft:"auto"}} onClick={handleClick} />
        </Container>
    )
}

export default ImagePreview