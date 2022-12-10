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
    },[]);

    return (
        <div className="format homepage">
            <div className="homepage_favourite">
                <div className="hp_row_1">
                    <h3>Oblíbené inzeráty</h3>
                    <button className="hp_button"><h3>Zobrazit všechny</h3></button>
                </div>
                <div className="hp_row_2">
                    <div className="hp_inzerat">
                        <img src="./img/1/1.jpg" alt="" className="hp_img"/>   
                        <p className="hp_title">Název</p>
                        <div className="hp_inzerat_detail_col">
                            <div className="hp_inzerat_detail_row">
                                <p className="hp_cat">Category</p>
                                <p className="hp_place">Place</p>
                            </div>
                            <div className="hp_inzerat_detail_row">
                                <p className="hp_views">Views</p>
                                <p className="hp_price">Price</p>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>

            <div className="homepage_beginner">
                <div className="hp_row_1">
                    <h3>Pro začátečníky</h3>
                    <button className="hp_button"><h3>Zobrazit všechny</h3></button>
                </div>
                <div className="hp_row_2">
                    <div className="hp_inzerat">
                        <img src="./img/1/1.jpg" alt="" className="hp_img"/>   
                        <p className="hp_title">Název</p>
                        <div className="hp_inzerat_detail_col">
                            <div className="hp_inzerat_detail_row">
                                <p className="hp_cat">Category</p>
                                <p className="hp_place">Place</p>
                            </div>
                            <div className="hp_inzerat_detail_row">
                                <p className="hp_views">Views</p>
                                <p className="hp_price">Price</p>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>

            <div className="homepage_all">
                <div className="hp_row_1">
                    <h3>Všechny inzeráty</h3>
                    <button className="hp_button"><h3>Zobrazit všechny</h3></button>
                </div>
                <div className="hp_row_2">
                    <div className="hp_inzerat">
                        <img src="./img/1/1.jpg" alt="" className="hp_img"/>   
                        <p className="hp_title">Název</p>
                        <div className="hp_inzerat_detail_col">
                            <div className="hp_inzerat_detail_row">
                                <p className="hp_cat">Category</p>
                                <p className="hp_place">Place</p>
                            </div>
                            <div className="hp_inzerat_detail_row">
                                <p className="hp_views">Views</p>
                                <p className="hp_price">Price</p>
                            </div>
                        </div>
                    </div>              
                </div>
            </div>
        </div>
    );
}

export default HomePage;

/*
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
                items.map((item:any) =>
                    <div key={item.pk}>
                        <h1>{item.fields.title}</h1>
                        <h3>{item.fields.description}</h3>
                        <Link to={"/product/" + item.pk} >{item.fields.title}</Link>
                    </div>
                )
            }
            </>
            }
            <img src="./img/1/1.jpg" alt="" className="img"/>            
        </div>
    );
 */