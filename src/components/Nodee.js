import React from "react";
import {useState, useRef} from "react";
export const Nodee = ({nodeId, name, type, highlightedNodes, setHighlightedNodes, adjacentNodes}) => {
    const [status, setStatus] = useState(('not taken'))
    const [clicked, setClick] = useState(false);
    const nodeRef = useRef(null);

    function handleSingleClick () {
        if (status === 'not taken') {
            setStatus('taken')
            // alert('taken')
        } else if (status === 'taken') {
            setStatus('passed')
            // alert('passed')
        } else if (status === 'passed') {
            setStatus('not taken')
            // alert('not taken')
        }
    }

    function collectHighlighted() {
        // This function may be modified if the JSON is changed in
        // a future in order to include, for each course, those other
        // subjects the former is a prerequisite of.

        let highlighted = new Set(adjacentNodes);
        highlighted.add(nodeId);

        console.log(...highlighted);
        setHighlightedNodes(highlighted);
    }

    function changeColor(){
        if(type === 'course'){
            if(clicked) {
                nodeRef.current.style.background = 'dimgray';
                nodeRef.current.style.color = '#dedede'
                setClick(false);
            }
            else{
                nodeRef.current.style.background = '#589f3c';
                nodeRef.current.style.color = 'light gray';
                setClick(true);
            }
        }
    }
    function handleClick(){
        changeColor();
        //Here should go the Navbar() function but it doesn't work for now
    }

    function enterNode() {
        if(type === 'course') {
            if (clicked) {
                // nodeRef.current.style.background = 'green';
                if (nodeRef.current.style.background === 'dimgray') {
                    nodeRef.current.style.color = '#dedede';
                } else {
                    nodeRef.current.style.color = 'white'
                    nodeRef.current.style.background = '#589f3c';
                }

            } else {
                nodeRef.current.style.color = '#dedede';
                nodeRef.current.style.background = 'dimgray'
            }
        } else {
            nodeRef.current.style.background = '#c75a1b';
            nodeRef.current.style.color = 'white';
        }
    }

    function leaveNode() {
        if(type === 'course') {
            if (clicked) {
                // Now that no node is hovered, return to full opacity
                nodeRef.current.style.background = 'green';
                nodeRef.current.style.color = 'light gray';
            } else {
                // Now that no node is hovered, return to full opacity
                nodeRef.current.style.background = '#dedede';
                nodeRef.current.style.color = 'black';
            }
        } else {
            nodeRef.current.style.background = 'darksalmon';
            nodeRef.current.style.color = 'black';
        }
    }

    return (
        <button 
            id={nodeId}
            onClick={handleSingleClick}
            onDoubleClick={handleClick}
            onMouseEnter={ () => {
                collectHighlighted();
                enterNode()
            }}
            onMouseLeave={() => {
                setHighlightedNodes(new Set())
                leaveNode()
            }}
            className='course-button'
            type={type}
            ref={nodeRef}
            style={{opacity: (highlightedNodes.has(nodeId) || highlightedNodes.size === 0) ? 1 : 0.25,
                    position: 'relative',
                    background:(type !=='course')?'darksalmon': '#dedede'}}
        >
            {name}
        </button>
    )
}