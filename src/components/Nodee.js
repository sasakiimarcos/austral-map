import React from "react";

export const Nodee = ({nodeId, name, onClick}) => {
    return (
        <button id={nodeId} onClick={onClick} style={{borderRadius: "12px"}}>
            {name}
        </button>
    )
}