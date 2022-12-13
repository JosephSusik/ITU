import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function AllPage() {
    //var [loading, setLoading]:any = useState(1);

    const location = useLocation();
    //Get value
    var {favorite_loc} = location?.state || "ne";
    var {category_loc} = location?.state || "def";
    var {narocnost_loc} = location?.state || "def";
    var {prostredni_loc} = location?.state || "def";
    var {platba_loc} = location?.state || "def";
    
    //Check if value of default
    if (favorite_loc !== "ano") { favorite_loc = "ne"}
    if (category_loc !== ("a"||"b"||"c"||"e"||"d"||"f"||"g"||"h")) { category_loc = "def"}
    if (narocnost_loc !== ("a"||"b"||"c"||"d")) { category_loc = "def"}
    if (prostredni_loc !== ("a"||"b"||"c"||"d")) { prostredni_loc = "def"}
    if (platba_loc !== ("a"||"b"||"c")) { platba_loc = "def"}

    var [all, setAll]:any = useState([]);

    var [category, setCategory]:any = useState(category_loc);
    var [favourite, setFavourite]:any = useState(favorite_loc);
    var [difficulty, setDifficulty]:any = useState(narocnost_loc);
    var [place, setPlace]:any = useState(prostredni_loc);
    var [pay, setPay]:any = useState(platba_loc);

    var fetch_link = 'http://localhost:8000/listings/';
   
    //if (favorite_loc === "ano") {
    if (favourite === "ano") {
        fetch_link = 'http://localhost:8000/listings/?favorite=true';
    }

    const fetchAll = async () => {
        const response = await fetch(fetch_link);
        const data = await response.json();
        console.log(data);
        setAll(data);
    }

    useEffect(() => {
        fetchAll();
        //setLoading(0);
    },[]);

    const handleCategory = (event:any) => {
        setCategory(event.target.value);
    }

    const handleFavourite = (event:any) => {
        setFavourite(event.target.value);
    }

    const handleDifficulty = (event:any) => {
        setDifficulty(event.target.value);
    }

    const handlePlace = (event:any) => {
        setPlace(event.target.value);
    }

    const handlePay = (event:any) => {
        setPay(event.target.value);
    }

    return (
        <div className="format f_a_b">
            <div className="f_a_b_filter">
                <h4>Filtry</h4>
                <div className="filter_r_1">
                    <div className="filter_item filter_drpdwn">
                        <p>Kategorie "{category}"</p>
                        <select name="filter_category" value={category} onChange={handleCategory}>
                            <option value="def">Kategorie</option>
                            <option value="a">Kaktusy</option>
                            <option value="b">Palmy</option>
                            <option value="c">Ovocné stromy</option>
                            <option value="d">Dekorativní stromy</option>
                            <option value="e">Dekorativní květiny</option>
                            <option value="f">Exotické rostliny</option>
                            <option value="g">Bylinky</option>
                            <option value="h">Ostatní</option>
                        </select>
                    </div>

                    <div className="filter_item filter_input">
                        <p>Název</p>
                        <input placeholder="Hledat..."></input>
                    </div>

                    <div></div>

                    <div className="filter_item filter_input">
                        <p>Lokalita</p>
                        <input placeholder="PSČ"></input>
                    </div>
                
                    <div className="filter_item filter_input">
                        <p>Vzdálenost</p>
                        <div className="filter_max_cm">
                            <input placeholder="Max"></input>
                            <p>km</p>
                        </div>
                    </div>

                </div>
                <div className="filter_r_2">
                    
                    <div className="filter_item filter_drpdwn">
                        <p>Náročnost</p>
                        <select value={difficulty} onChange={handleDifficulty}>
                            <option value="def">Náročnost</option>
                            <option value="a">Začátečníci</option>
                            <option value="b">Pokročilí</option>
                            <option value="c">Experti</option>
                            <option value="d">Není známo</option>
                        </select>
                    </div>
                    
                    <div className="filter_item filter_drpdwn">
                        <p>Prostředí</p>
                        <select value={place} onChange={handlePlace}>
                            <option value="def">Prostředí</option>
                            <option value="a">Vnitřní</option>
                            <option value="b">Venkovní</option>
                            <option value="c">Všude</option>
                            <option value="d">Není známo</option>
                        </select>
                    </div>

                    <div className="filter_item filter_drpdwn">
                        <p>Forma platby</p>
                        <select value={pay} onChange={handlePay}>
                            <option value="def">Forma platby</option>
                            <option value="a">Zdarma</option>
                            <option value="b">Prodej</option>
                            <option value="c">Výměna</option>
                        </select>
                    </div>

                    <div className="filter_item filter_input">
                        <p>Výška</p>
                        <div className="filter_max_cm">
                            <input placeholder="Max"></input>
                            <p>cm</p>
                        </div>
                    </div>

                    <div className="filter_item filter_input">
                        <p>Průměr květináče</p>
                        <div className="filter_max_cm">
                            <input placeholder="Max"></input>
                            <p>cm</p>
                        </div>
                    </div>

                </div>
                <div className="filter_r_3">
                    
                    <div className="filter_item filter_input">
                        <p>Průměr květináče</p>
                        <div className="filter_max_cm">
                            <input placeholder="Max"></input>
                            <p>cm</p>
                        </div>
                    </div>

                    <div className="filter_item filter_drpdwn">
                        <p>Pouze oblíbené "{favourite}"</p>
                        <select value={favourite} onChange={handleFavourite}>
                            <option value="ano">Ano</option>
                            <option value="ne">Ne</option>
                        </select>
                    </div>

                    <div className="format_div_nemazat_abrakadabra"></div>
                    <div className="format_div_nemazat_abrakadabra"></div>

                    <Link to="/all" state={{favorite:favourite,
                                            category_loc:category,
                                            narocnost_loc:difficulty,
                                            prostredni_loc:place,
                                            platba_loc:pay
                                    
                                    }}><button className="filter_button">Hledat</button></Link>

                </div>
            </div>
      
            <div className="f_a_b_display">
            {
                all.map((item:any) =>
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.title}</b></p>
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
    );
}

export default AllPage;