import React from "react";
import {useState, useRef} from "react";
export const Nodee = ({nodeId, name, type, hoveredNode, setHoveredNode}) => {
    const [clicked, setClick] = useState(false);
    const nodeRef = useRef(null);
    function changeColor(){
        if(type === 'course'){
            if(clicked) {
                nodeRef.current.style.background = 'dimgray';
                setClick(false);
            }
            else{
                nodeRef.current.style.background = 'green';
                setClick(true);
            }
        }
    }
    function handleClick(){
        changeColor();
        //Here should go the Navbar() function but it doesn't work for now
    }

    function enterNode() {
        if(clicked) {
            nodeRef.current.style.background = 'dimgray';
            if(nodeRef.current.style.background === 'dimgray') nodeRef.current.style.color = '#dedede';
            else nodeRef.current.style.color = 'black'

        }
        else{
            nodeRef.current.style.color = '#dedede';
            nodeRef.current.style.background = 'dimgray'

        }
    }

    function leaveNode() {
        if(clicked) {
            // Now that no node is hovered, return to full opacity
            nodeRef.current.style.background = '#dedede';
            nodeRef.current.style.color = 'black';
        }
        else{
            // Now that no node is hovered, return to full opacity
            nodeRef.current.style.background = '#dedede';
            nodeRef.current.style.color = 'black';
        }
    }

    return (
        <button 
            id={nodeId}
            onDoubleClick={handleClick}
            onMouseEnter={() => {
                setHoveredNode(nodeId)
                enterNode()
            }}
            onMouseLeave={() => {
                setHoveredNode(null)
                leaveNode()
            }}
            className='course-button'
            type={type}
            ref={nodeRef}
            style={{opacity: (hoveredNode === nodeId || hoveredNode === null) ? 1 : 0.25, position: 'relative', background:(type !=='course')?'darksalmon': '#dedede'}}
        >
            {name}
        </button>
    )
}