import React, { useEffect, useState } from "react";

function HomePage() {

    var [items, setItem]:any = useState([]);
    var [loading, setLoading]:any = useState(1);

    const handleFetchData = async () => {
        const response = await fetch('http://localhost:8000/listings/');
        const data = await response.json();
        console.log(data);
        setItem(data);
    }
    
    useEffect(() => {
        handleFetchData();
        setLoading(0);
    },[])

    return(
        <div className="format">
            <p>Homepage</p>
            {loading?
                <>
                <p>loading</p>
                </>
            :
            <>
            <pre>{JSON.stringify(items, null, 2)}</pre>
            {
                items.map((item:any, i:any) =>
                    <div key={item}>
                        <h1>{item.fields.title}</h1>
                        <h3>{item.fields.description}</h3>
                    </div>
                )
            }
            </>
            }
        </div>
    );
}

export default HomePage;