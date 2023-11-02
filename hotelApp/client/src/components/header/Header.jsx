import React, { useContext } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useState} from 'react'
import {format, addDays, isSameDay } from "date-fns"
import { useNavigate } from "react-router";
import { SearchContext } from "../../context/SearchContext";

const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false);
    const [dateClicked, setDateClicked] = useState(false);
    const [dates, setDates] = useState([
        {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();

    const handleOption = (name, operation) =>{
        setOptions(prev=>{
            let newValue;
            if (operation === "i") {
                newValue = prev[name] + 1;
            } else {
                newValue = prev[name] - 1;
            }
            if (name === "adult") {
                newValue = Math.max(1, Math.min(4, newValue));
            } else if (name === "children") {
                newValue = Math.max(0, Math.min(3, newValue));
            } else if (name === "room") {
                newValue = Math.max(0, Math.min(3, newValue));
            }
            return {
                ...prev, 
                [name]: newValue
            };
        });
    };

    const {dispatch} = useContext(SearchContext);

    const handleSearch = () =>{
        if (!dateClicked) {
            alert("Por favor, selecciona una fecha antes de realizar la búsqueda.");
        }else{
        dispatch({type:"NEW_SEARCH", payload:{dates, options}});
        navigate("/reserva", {state:{dates, options}}); }
    }

    return(
        <div className="header">
            <div className={type === "reserva" ? "headerContainer reservaMode" : "headerContainer"}>
                {type !== "reserva" &&
                <>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <span onClick={()=>setOpenDate(!openDate)} className="headerSerchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                        { openDate && <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {
                                const maxEndDate = addDays(item.selection.startDate, 30);
                                let endDate = item.selection.endDate;

                                if (isSameDay(item.selection.startDate, item.selection.endDate)) {
                                endDate = addDays(item.selection.endDate, 1);
                                }

                                endDate = endDate > maxEndDate ? maxEndDate : endDate;

                                setDates([{ ...item.selection, endDate }]);
                                setDateClicked(true);
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date"
                            minDate={new Date()}
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                        <span onClick={()=>setOpenOptions(!openOptions)} className="headerSerchText">{`${options.adult} adultos · ${options.children} niños · ${options.room} habitaciones`}</span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adultos</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Niños</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Habitaciones</span>
                                <div className="optionCounter">
                                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div> }
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Buscar</button>
                    </div>
                </div></> }
            </div> 
        </div>
    )
}

export default Header
