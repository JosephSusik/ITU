import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function AllPage() {

    const location = useLocation();
    var {favorite} = location?.state || "ne";

    if (favorite !== "ano") { favorite = "ne"}

    var [all, setAll]:any = useState([]);
    var [loading, setLoading]:any = useState(1);

    var [category, setCategory]:any = useState("def");
    var [favourite, setFavourite]:any = useState(favorite);

    var fetch_link = 'http://localhost:8000/listings/';
   
    if (favorite === "ano") {
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
        setLoading(0);
    },[]);

    const handleCategory = (event:any) => {
        setCategory(event.target.value);
    }

    const handleFavourite = (event:any) => {
        setFavourite(event.target.value);
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
                        <select>
                            <option value="def">Náročnost</option>
                            <option value="a">Začátečníci</option>
                            <option value="b">Pokročilí</option>
                            <option value="c">Experti</option>
                            <option value="d">Není známo</option>
                        </select>
                    </div>
                    
                    <div className="filter_item filter_drpdwn">
                        <p>Prostředí</p>
                        <select>
                            <option value="def">Prostředí</option>
                            <option value="a">Vnitřní</option>
                            <option value="b">Venkovní</option>
                            <option value="c">Všude</option>
                            <option value="d">Není známo</option>
                        </select>
                    </div>

                    <div className="filter_item filter_drpdwn">
                        <p>Forma platby</p>
                        <select>
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
                        <select onChange={handleFavourite} value={favourite}>
                            <option value="ano">Ano</option>
                            <option value="ne">Ne</option>
                        </select>
                    </div>

                    <div className="format_div_nemazat_abrakadabra"></div>
                    <div className="format_div_nemazat_abrakadabra"></div>

                    <button className="filter_button">Hledat</button>

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