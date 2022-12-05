import axios from "axios";
import React, { useEffect, useState } from "react";

function HomePage() {

    const [item, setItem] = useState();

    useEffect(() => {

        axios
        .get('http://localhost:8000/listings/', )
        .then(function(response) {
            console.log("Response: " + response);
            setItem(response.data);
        })
        .catch(function(error) {
            console.log("ERROR: " + error);
        })


    })


    return(
        <div>
            <p>Homepage</p>
            {JSON.stringify(item)}
        </div>
    );
}

export default HomePage;