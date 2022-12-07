import React, { useEffect } from "react";

function HomePage() {


    useEffect(() => {

        fetch('http://127.0.0.1:8000/listings/')
        .then((response) => console.log("Response: " +response));
    

    })


    return(
        <div>
            <p>Homepage</p>
        </div>
    );
}

export default HomePage;