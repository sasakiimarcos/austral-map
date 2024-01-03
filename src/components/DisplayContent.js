import React from 'react';
import {FileUpload} from "./FileUpload";
import {Nodee} from "./Nodee"
import {Edge} from "./Edge"
import {Graph} from "./Graph";

export const DisplayContent = ({selectedOption, onReturn, courses}) => {

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
            <Graph courses={courses}/>
            <div id="pde">
                <div className="cuatrimestre">
                    <h2>Curso de Ingreso</h2>
                    <div>
                        <Nodee nodeId='mat' name="Matemática"/>
                    </div>
                    <div>
                        <Nodee nodeId='fis' name="Física"/>
                    </div>

                    {/* <li className="node">Matemática</li>
                    <li className="node">Física</li> */}
                </div>
                <div className="cuatrimestre">
                    <h2>Primer Cuatrimestre</h2>

                    <div>
                        <Nodee nodeId='anmat' name="Análisis Matemático I"/>
                    </div>
                    <div>
                        <Nodee nodeId='alg' name="Álgebra I"/>
                    </div>
                    <div>
                        <Nodee nodeId='ing' name="Introducción a Ingeniería"/>
                    </div>
                    <div>
                        <Nodee nodeId='fil' name="Filosofía General"/>
                    </div>
                    <div>
                        <Nodee nodeId='prog' name="Programación I"/>
                    </div>
                    {/* <li className="node">Análisis Matemático I</li>
                    <li className="node">Álgebra I</li>
                    <li className="node">Introducción a Ingeniería</li>
                    <li className="node">Filosofía General</li>
                    <li className="node">Programación I</li> */}
                </div>
                <div className="cuatrimestre">
                    <h2>Segundo Cuatrimestre</h2>
                    <div>
                        <Nodee nodeId='anmat2' name="Análisis Matemático II"/>
                    </div>
                    <div>
                        <Nodee nodeId='alg2' name="Álgebra II"/>
                    </div>
                    <div>
                        <Nodee nodeId='fismec' name="Física Mecánica"/>
                    </div>
                    <div>
                        <Nodee nodeId='td' name="Técnicas Digitales"/>
                    </div>
                    <div>
                        <Nodee nodeId='prog2' name="Programación II"/>
                    </div>
                    {/* <li className="node">Análisis Matemático II</li>
                    <li className="node">Álgebra II</li>
                    <li className="node">Física Mecánica</li>
                    <li className="node">Técnicas Digitales</li>
                    <li className="node">Programación II</li> */}
                </div>

                {/* Define edges */}
                <Edge start="anmat" end="anmat2"/>
                <Edge start="alg" end="alg2"/>
                <Edge start="prog" end="prog2"/>
                <Edge start="anmat" end="fismec"/>
                <Edge start="prog" end="td"/>
            </div>
            <button onClick={onReturn}>Return to Original Page</button>
        </div>    
    )
}

