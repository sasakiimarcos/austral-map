import React from "react";
export const Nodee = ({nodeId, name, onClick}) => {
    return (
        <button id={nodeId} onClick={onClick}>
            {name}
        </button>
    )
}