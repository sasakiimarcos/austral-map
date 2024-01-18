import React, {useState} from 'react';
import {FileUpload} from "./FileUpload";
import {Nodee} from "./Nodee"
import {Edge} from "./Edge"
import {Graph} from "./Graph";

export const DisplayContent = ({selectedOption, onReturn, courses}) => {

    const planMap = new Map ([
        ["ing-inf-23", "Ingeniería Informática Plan 2023"],
        ["ing-inf-10", "Ingeniería Informática Plan 2010"],
        ["ing-ind-23", "Ingeniería Industrial Plan 2023"],
        ["ing-bio-24", "Ingeniería Biomédica Plan 2024"]
    ])

    const [classStatus, setClassStatus] = useState('{}');

    const handleClass = (courses) => {
        setClassStatus(courses)
    }

    return (
        <div className='content'>
            <p>Plan Elegido: {planMap.get(selectedOption)}</p>
            <FileUpload setClasses={handleClass}/>
            <Graph courses={courses} coursesStatus={classStatus}/>
            
            <button onClick={onReturn} className='return-button'>Return to Original Page</button>
        </div>
    )
}

