import React from "react";
import {useState, useRef} from "react";
import Navbar from "./Navbar"
export const Nodee = ({nodeId, name, type, hoveredNode, setHoveredNode}) => {
    const [clicked, setClick] = useState(false);
    const nodeRef = useRef(null);

    

    function changeColor(){
        
        const course_color = '#dedede';
        const other_color = 'darksalmon'
        if(type === 'course'){
            if(clicked) {
                nodeRef.current.style.background = 'dimgray';
                setClick(false);
                nodeRef.current.onmouseover = function (){
                    setHoveredNode(nodeId);

                    nodeRef.current.style.background = 'dimgray';
                    if(nodeRef.current.style.background === 'dimgray') nodeRef.current.style.color = course_color;
                    else nodeRef.current.style.color = 'black'

                }
                nodeRef.current.onmouseleave = function (){
                    // Now that no node is hovered, return to full opacity
                    setHoveredNode(null);

                    nodeRef.current.style.background = course_color;
                    nodeRef.current.style.color = 'black';
                }

            }
            else{
                nodeRef.current.style.background = 'green';
                setClick(true);
                nodeRef.current.onmouseover = function (){
                    setHoveredNode(nodeId);

                    nodeRef.current.style.color = course_color;
                }
                nodeRef.current.onmouseleave = function (){
                    // Now that no node is hovered, return to full opacity
                    setHoveredNode(null);

                    nodeRef.current.style.color = 'black';
                }

            }
        }
        else{
            nodeRef.current.style.background = other_color;
        }
    }
    function handleClick(){
        changeColor();
        //Here should go the Navbar() function but it doesn't work for now
    }

    return (
        <button 
            id={nodeId}
            onDoubleClick={handleClick}
            onMouseEnter={() => {setHoveredNode(nodeId)}}
            onMouseLeave={() => {setHoveredNode(null)}}
            className='course-button'
            type={type}
            ref={nodeRef}
            style={{opacity: (hoveredNode === nodeId || hoveredNode === null) ? 1 : 0.25, position: 'relative'}}
        >
            {name}
        </button>
    )
}