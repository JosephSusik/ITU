import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Grid2 from '@mui/material/Unstable_Grid2';
import Globals from "../components/Globals";


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container } from "@mui/system";


function ListingPage() {

    var [item, setItem]:any = useState([]);
    var [loading, setLoading]:any = useState(1);
    var [mainImg, setMainImg]:any = useState([])

    const [value, setValue] = useState(0);
    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
      };

    let { id } = useParams();
    
    const handleFetchData = async () => {
        const response = await fetch('http://localhost:8000/listings/' + id + '/');
        const data = await response.json();
        console.log(data);
        setItem(data);
        setMainImg({id: data.mainImage.id, path: data.mainImage.path})
    }

    useEffect(() => {
        handleFetchData();
        setLoading(0);
    },[]);

    const i = 1;
    return (
        <>
            <div style={{width:"75%", margin: "auto"}}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={2}>
                        <ImageList sx={{ width: 150, height: 400 }} cols={1} rowHeight={150}>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/1.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/4.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/1.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/4.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/1.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/4.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/1.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/4.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/1.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/4.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/1.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                            <Container fixed style={{maxWidth: "100%", maxHeight:"100px"}}>
                                <img src="/img/1/4.jpg" style={{maxHeight:"100%", maxWidth:"100%"}}  className="center"></img>
                            </Container>
                        </ImageList>
                    </Grid2>
                    <Grid2 xs={5}>
                        <Container fixed style={{width: "400px", height:"400px"}}>
                            <img src="/img/1/1.jpg" style={{ maxWidth:"100%", maxHeight:"100%"}} className="center"/>
                        </Container>
                    </Grid2>
                    <Grid2 xs={5}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <h2>Starostlivost:</h2>
                        <p>{item.instructions}</p>

                    </Grid2>
                </Grid2>
            </div>
        </>
    );
}

export default ListingPage;