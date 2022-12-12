import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function HomePage() {

    var [all, setAll]:any = useState([]);
    var [favourites, setFavourites]:any = useState([]);
    var [beginners, setBeginners]:any = useState([]);
    var [loading, setLoading]:any = useState(1);

    const fetchAll = async () => {
        const response = await fetch('http://localhost:8000/listings/');
        const data = await response.json();
        console.log(data);
        setAll(data);
    }

    const fetchFavourites = async () => {
        const response = await fetch('http://localhost:8000/listings?isFavorite=false');
        const data = await response.json();
        console.log(data);
        setFavourites(data);
    }

    const fetchBeginner = async () => {
        const response = await fetch('http://localhost:8000/listings/?diff=Easy');
        const data = await response.json();
        console.log(data);
        setBeginners(data);
    }
    
    useEffect(() => {
        fetchAll();
        //fetchFavourites();
        fetchBeginner();
        setLoading(0);
    },[]);


    var display_all = all.slice(0,4);
    var display_favourites = favourites.slice(0,4);
    var display_beginners = beginners.slice(0,4);

    return (
        <div className="format homepage">
            <div className="homepage_favourite">
                <div className="hp_row_1">
                    <h3>Oblíbené inzeráty</h3>
                    <Link to="/favourites" className="hp_button_link"><button className="hp_button"><h3>Zobrazit všechny</h3></button></Link>
                </div>
                <div className="hp_row_2">

                {
                    display_all.map((item:any) =>
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.description}</b></p>
                            <div className="hp_inzerat_detail_col">
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_cat">{item.category.name}</p>
                                    <p className="hp_place">{item.locationName}</p>
                                </div>
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_views">{item.size}</p>
                                    <p className="hp_price"><b>{item.price} czk</b></p>
                                </div>
                            </div>
                        </div>   
                    )
                }
                   
                </div>
            </div>

            <div className="homepage_beginner">
                <div className="hp_row_1">
                    <h3>Pro začátečníky</h3>
                    <Link to="/beginners" className="hp_button_link"><button className="hp_button"><h3>Zobrazit všechny</h3></button></Link>
                </div>
                <div className="hp_row_2">
                {
                    display_beginners.map((item:any) =>
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.description}</b></p>
                            <div className="hp_inzerat_detail_col">
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_cat">{item.category.name}</p>
                                    <p className="hp_place">{item.locationName}</p>
                                </div>
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_views">{item.size}</p>
                                    <p className="hp_price"><b>{item.price} czk</b></p>
                                </div>
                            </div>
                        </div>   
                    )
                }             
                </div>
            </div>

            <div className="homepage_all">
                <div className="hp_row_1">
                    <h3>Všechny inzeráty</h3>
                    <Link to="/all" className="hp_button_link"><button className="hp_button"><h3>Zobrazit všechny</h3></button></Link>
                </div>
                <div className="hp_row_2">
                {
                    display_all.map((item:any) =>
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.description}</b></p>
                            <div className="hp_inzerat_detail_col">
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_cat">{item.category.name}</p>
                                    <p className="hp_place">{item.locationName}</p>
                                </div>
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_views">{item.size}</p>
                                    <p className="hp_price"><b>{item.price} czk</b></p>
                                </div>
                            </div>
                        </div>   
                    )
                }  
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