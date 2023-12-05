import React from 'react';
import {FileUpload} from "./FileUpload";

export const DisplayContent = ({selectedOption, onReturn}) => {

    const planMap = new Map ([
        ["ing-inf-23", "Ingeniería Infromática Plan 2023"],
        ["ing-inf-10", "Ingeniería Infromática Plan 2010"],
        ["ing-ind-23", "Ingeniería Industrial Plan 2023"],
        ["ing-bio-24", "Ingeniería Biomédica Plan 2024"]
    ])

    return (
        <div>
            {/* Content to display after form submission */}
            <p>Plan</p>
            <p>Selected Option: {planMap.get(selectedOption)}</p>
            <FileUpload />
            <button onClick={onReturn}>Return to Original Page</button>
        </div>
    )
}

