import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    }

    useEffect(() => {
        handleFetchData();
        setLoading(0);
    },[]);

    const i = 1;
    return (
        <>
            {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
            <div>
                <div>
                    <img src="/img/1/1.jpg" className="img"/>
                </div>
                <div>
                    <img src="/img/1/1.jpg" className="img"/>
                </div>
                <div>
                    <img src="/img/1/1.jpg" className="img"/>
                </div>
                <div>
                    <img src="/img/1/1.jpg" className="img"/>
                </div>
            </div>
            </>
    );
}

export default ListingPage;