import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

//For reload
var trigger = false;

function AllPage() {
    //var [loading, setLoading]:any = useState(1);

    const location = useLocation();
    //Get value
    var {favorite_loc} = location?.state || "ne";
    var {category_loc} = location?.state || "def";
    var {narocnost_loc} = location?.state || "def";
    var {prostredni_loc} = location?.state || "def";
    var {platba_loc} = location?.state || "def";
    var {psc_loc} =  location?.state || "def";

    //Check if value of default
    if (favorite_loc !== "ano") { favorite_loc = "ne"}
    if (category_loc !== ("1"||"2"||"3"||"4"||"5"||"6"||"7"||"8"||"9"||"10"||"11")) { category_loc = "def"}
    if (narocnost_loc !== ("Lehká"||"Střední"||"Těžká"||"Nezadáno")) { narocnost_loc = "def"}
    if (prostredni_loc !== ("Uvnitř"||"Venku"||"Všude"||"Nezadáno")) { prostredni_loc = "def"}
    if (platba_loc !== ("Zdarma"||"Výměna"||"Prodej")) { platba_loc = "def"}
    if (psc_loc === (null||undefined||"")) {  psc_loc = "" }


    var [all, setAll]:any = useState([]);

    var [category, setCategory]:any = useState(category_loc);
    var [favourite, setFavourite]:any = useState(favorite_loc);
    var [difficulty, setDifficulty]:any = useState(narocnost_loc);
    var [place, setPlace]:any = useState(prostredni_loc);
    var [pay, setPay]:any = useState(platba_loc);
    var [psc, setPsc]:any = useState(psc_loc);



    var fetch_link = 'http://localhost:8000/listings/?';

    if (category !== "def") {
        fetch_link += 'cat=' + category + '&';
    }

    if (favourite === "ano") {
        fetch_link += 'favorite=true&';
    }

    if (difficulty !== "def") {
       fetch_link += 'diff=' + difficulty + '&';
    }

    if (place !== "def") {
        fetch_link += 'environment=' + place + '&';
    }

    if (pay !== "def") {
        //fetch_link += 'ttype=' + pay + '&';
    }

    if ((psc !== "") && (psc !== undefined) && (psc !== null)) {
        fetch_link += 'zip=' + psc + '&';
    }

    const fetchAll = async () => {
        const response = await fetch(fetch_link);
        const data = await response.json();
        console.log(data);
        setAll(data);
    }

    function toggle() {
        trigger = !trigger;
    }

    console.log("fetch: " + fetch_link);

    useEffect(() => {
        fetchAll();
        //setLoading(0);
    },[trigger]);

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

    const handlePsc = (event:any) => {
        setPsc(event.target.value);
    }

    return (
        <div className="format f_a_b">
            <div className="f_a_b_filter">
                <h4>Filtry</h4>
                <div className="filter_r_1">
                    <div className="filter_item filter_drpdwn">
                        <p>Kategorie</p>
                        <select name="filter_category" value={category} onChange={handleCategory}>
                            <option value="def">Kategorie</option>
                            <option value="1">Kaktusy</option>
                            <option value="2">Palmy</option>
                            <option value="3">Ovocné stromy</option>
                            <option value="4">Okrasné stromy</option>
                            <option value="5">Okrasné rostliny</option>
                            <option value="7">Bylinky</option>
                            <option value="6">Ostatní</option>
                            <option value="8">Exotické rostliny</option>
                            <option value="10">Užitkové rosltiny</option>
                            <option value="9">Skalničky</option>
                            <option value="11">Okrasné keře</option>
                        </select>
                    </div>

                    <div className="filter_item filter_input">
                        <p>Název</p>
                        <input placeholder="Hledat..."></input>
                    </div>

                    <div></div>

                    <div className="filter_item filter_input">
                        <p>Lokalita</p>
                        <input placeholder="PSČ" onChange={handlePsc} value={psc}></input>
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
                        <p>Obtížnost</p>
                        <select value={difficulty} onChange={handleDifficulty}>
                            <option value="def">Obtížnost</option>
                            <option value="Lehká">Lehká</option>
                            <option value="Střední">Střední</option>
                            <option value="Těžká">Těžká</option>
                            <option value="Nezadáno">Nezadáno</option>
                        </select>
                    </div>
                    
                    <div className="filter_item filter_drpdwn">
                        <p>Prostředí</p>
                        <select value={place} onChange={handlePlace}>
                            <option value="def">Prostředí</option>
                            <option value="Uvnitř">Uvnitř</option>
                            <option value="Venku">Venku</option>
                            <option value="Všude">Všude</option>
                            <option value="Nezadáno">Nezadáno</option>
                        </select>
                    </div>

                    <div className="filter_item filter_drpdwn">
                        <p>Typ inzerátu</p>
                        <select value={pay} onChange={handlePay}>
                            <option value="def">Forma platby</option>
                            <option value="Zdarma">Zdarma</option>
                            <option value="Výměna">Výměna</option>
                            <option value="Prodej">Prodej</option>
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
                                            platba_loc:pay,
                                            psc_loc:psc
                                    
                                    }}><button className="filter_button" onClick={()=>toggle()}>Hledat</button></Link>

                </div>
            </div>
      
            <div className="f_a_b_display">
            {
                all.map((item:any) =>
                    <Link to={"../listing/" + item.id} className="inzerat_link" >
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
                    </Link>
                    )
            }  
            </div>
        </div>    
    );
}

export default AllPage;