import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Grid2 from '@mui/material/Unstable_Grid2';
import { Container } from "@mui/system"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClassIcon from '@mui/icons-material/Class';
import WarningIcon from '@mui/icons-material/Warning';


import ImagePreview from "../components/ProductPage/ImagePreview";
import PropertiesDisplay from "../components/ProductPage/PropertiesDisplay";

function ListingPage() {


    let { id } = useParams();

    var [item, setItem]: any = useState([]);
    var [mainImg, setMainImg]: any = useState([]);


    const handleFetchData = async () => {
        const response = await fetch('http://localhost:8000/listings/' + id + '/');
        const data = await response.json();
        console.log(data);
        setItem(data);
        setMainImg({ id: data.mainImage.id, path: data.mainImage.path })
    }

    useEffect(() => {
        handleFetchData();
    }, []);


    const handleClick = (event:any, id:any, path:any) => {
        setMainImg({ id: id, path: path })
    }

    const i = 1;
    return (
        <>
            <div style={{ width: "80%", marginLeft: "auto", marginRight:"auto" }}>
                <Grid2 container spacing={1} columns={10} columnSpacing={0}>
                    <Grid2 xs={1}>
                        {/* {item && item.image_listing && item.image_listing.map((image: any) =>
                            <Container key={image.id} fixed style={{ maxWidth: "70%", marginLeft: "auto", marginRight: 0 }}>
                                <img src={image.path} style={{ maxWidth: "100%", border:"5px solid green" }} onClick={(event) => handleClick(event, image.id, image.path)} />
                            </Container> )} */}
                        {item && item.image_listing && item.image_listing.map((image: any) =>
                            <ImagePreview image={image} handle={setMainImg} mainImgID={mainImg.id}/>
                            )}

                    </Grid2>
                    <Grid2 md={4}>
                        <Container fixed style={{ width: "100%" }}>
                            <img src={mainImg.path} style={{ width: "100%", height: "100%" }} className="center"/>
                        </Container>
                    </Grid2>
                    <Grid2 md={5}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <h2>Starostlivost:</h2>
                        <p>{item.instructions ? item.instructions : 'Tento inzerat nemá žádné informace o starostlivosti.'}</p>
                    </Grid2>
                    <Grid2 xs={10}>
                        <h2>Informace</h2>
                    </Grid2>
                    <Grid2 xs={5}>
                    {item && item.image_listing &&
                        <PropertiesDisplay item={item}/>
                    }
                    </Grid2>
                    <Grid2 xs={10}>
                        <h2>Akce</h2>
                        <p><FavoriteIcon />Přidat do oblíbených</p>
                        <p><ClassIcon color='warning' style={{color:'red'}}/>Nahlásit nesprávnou kategorii</p>
                        <p><WarningIcon color='error'/>Nahlásit inzerát</p>
                    </Grid2>
                </Grid2>
            </div>
        </>
    );
}

export default ListingPage;