import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button'

function ListingPage() {

    var [items, setItem]:any = useState([]);
    var [loading, setLoading]:any = useState(1);
    var [mainImg, setMainImg]:any = useState([])

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
            
            </>
    );
}

export default ListingPage;