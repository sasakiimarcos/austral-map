import React from "react";
import {useState} from "react";
import Navbar from "./Navbar"
export const Nodee = ({nodeId, name, type}) => {
    const [clicked, setClick] = useState(false);
    function changeColour(){
        const node = document.getElementById(nodeId)
        const colour = '#dedede';
        const other_colour = 'lightblue'
        if(type === 'course'){
            if(clicked) {
                node.style.background = colour
                setClick(false)
            }
            else{
                node.style.background = 'green'
                setClick(true)
            }
        }
        else{
            node.style.background = other_colour;
        }
    }

    function handleClick(){
        changeColour();
        //Here should go the Navbar() function but it doesn't work for now
    }

    return (
        <button id={nodeId} onClick={handleClick} className='course-button' type={type}>
            {name}
        </button>
    )
}