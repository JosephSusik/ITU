import axios from "axios";
import React, { useEffect } from "react";

function HomePage() {


    useEffect(() => {

        axios
        .get('http://localhost:8000/listings/', )
        .then(function(response) {
            console.log("Response: " + response);
        })
        .catch(function(error) {
            console.log("ERROR: " + error);
        })


    })


    return(
        <div>
            <p>Homepage</p>
        </div>
    );
}

export default HomePage;