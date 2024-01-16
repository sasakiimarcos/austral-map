import React from "react";
import {useState} from "react";
import Navbar from "./Navbar"
export const Nodee = ({nodeId, name, type}) => {
    const [clicked, setClick] = useState(false);
    const nodes = document.getElementById(nodeId)
    function changeColour(){
        const colour = '#dedede';
        const other_colour = 'lightblue'
        if(type === 'course'){
            if(clicked) {
                nodes.style.background = 'dimgray';
                setClick(false);
                nodes.onmouseover = function (){
                    nodes.style.background = 'dimgray';
                    if(nodes.style.background === 'dimgray') nodes.style.color = colour;
                    else nodes.style.color = 'black'

                }
                nodes.onmouseleave = function (){
                    nodes.style.background = colour;
                    nodes.style.color = 'black';
                }

            }
            else{
                nodes.style.background = 'green';
                setClick(true);
                nodes.onmouseover = function (){
                    nodes.style.color = colour;
                }
                nodes.onmouseleave = function (){
                    nodes.style.color = 'black';
                }

            }
        }
        else{
            nodes.style.background = other_colour;
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