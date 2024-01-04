import React from "react";

function applyStyles(){
    setStyle({
        backgroundColor: "green"
    });
}

export const Nodee = ({nodeId, name, onClick}) => {

    const handleClick = (event) => {
        applyStyles();
        onClick(event);
    }

    return (
        <button id={nodeId} onClick={handleClick}>
            {name}
        </button>
    )
}