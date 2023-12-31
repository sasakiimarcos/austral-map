import React from 'react';
import {FileUpload} from "./FileUpload";
import {Nodee} from "./Nodee"
import {Edge} from "./Edge"

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
            
            <div>
                <div style={{float: "left"}}>
                    <Nodee nodeId="mat1" name={"Materia 1"}/>
                </div>
            </div>
            <h3>Just some text to create space</h3>
            <div>
                <div style={{float: "right"}}>
                    <Nodee nodeId="mat2" name={"Materia 2"}/>
                </div>
            </div>
            <Edge start={"mat1"} end={"mat2"} />

            <button onClick={onReturn}>Return to Original Page</button>
        </div>        
    )
}

