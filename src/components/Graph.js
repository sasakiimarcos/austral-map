import {Nodee} from "./Nodee";
import React from "react";
import {Edge} from "./Edge";
import { useState } from "react";
import Draggable from "react-draggable";

export const Graph = ({ courses, coursesStatus }) =>  {

    // The following groups the courses by year and semester. Creates a map where the key is composed
    // of year and semester
    const groupedCourses = courses.reduce((acc, course) => {
        const key = `${course.Year}-${course.Semester}`;

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(course);
        return acc;
    }, {});

    const otherCourses = [
        ['Electives', groupedCourses['Electives-null']],
        ['Other Requirements', groupedCourses['Other Requirements-null']]]

    delete groupedCourses['Electives-null']
    delete groupedCourses['Other Requirements-null']

    // courseStatusObj is an object containing the course ID as its key and the respective grade and status as its value
    // (es el courseMap de franz)
    const coursesStatusObj = JSON.parse(coursesStatus)

    // We'll keep the node which is currently hovered in a state and pass down
    // both this state and the state modifier to each node
    const [highlightedNodes, setHighlightedNodes] = useState(new Set());

    // Create a list of the IDs of other courses, we later use this to avoid creating edges for electives
    const otherCoursesID = otherCourses[0][1].map(course => {return course.ID})

    return (
        <div className='courses-container'>
            {/*<p>Received Map Data: {coursesStatus}</p>*/}
            <div className='semester-container'>
                {Object.entries(groupedCourses).map(([key, coursesGroup]) => (
                    <div key={key} className='semester'>
                        <h2 style={{color:'#dedede'}}>{`${(coursesGroup[0].Year - 1) * 2 + coursesGroup[0].Semester}C`}</h2>
                        {coursesGroup.map(course => {
                            const regex = /\(([^,]+),\s*Regularizada\)/g;

                            const codesList1 = [];
                            const codesList2 = [];
                            if (course.Year !== 'Electives'){
                                let match;
                                while ((match = regex.exec(course['Prerequisites to Take'])) !== null) {
                                    const code = match[1];
                                    codesList1.push(code);
                                }
                                while ((match = regex.exec(course['Prerequisite to Take for'])) !== null) {
                                    const code = match[1];
                                    if (!otherCoursesID.includes(code)) {
                                        codesList2.push(code);
                                    }
                                }
                            }

                            return (
                                <Draggable
                                    axis={"y"}
                                    bounds="parent">
                                <div className='node-div'>
                                    <Nodee
                                        key={course.ID}
                                        nodeId={course.ID}
                                        name={course.Course}
                                        type={'course'}
                                        highlightedNodes={highlightedNodes}
                                        setHighlightedNodes={setHighlightedNodes}
                                        adjacentNodes={codesList1.concat(codesList2)}
                                    />

                                    {codesList1.map(prerequisite => (
                                        <Edge
                                            start={prerequisite}
                                            end={course.ID}
                                            highlightedNodes={highlightedNodes}
                                        />
                                    ))}

                                </div>
                        </Draggable>
                            )
                        })}
                    </div>

                ))}
            </div>
            <div className='other-container'>
                {otherCourses.map((courses) => (
                    <div key={courses[0]} className='other'>
                        <div className='other-title'>
                            <h2>{`${courses[0]}`}</h2>
                        </div>
                        <div className='other-courses'>
                            {courses[1].map(course => (
                                <div className='other-div'>
                                    <Nodee key={course.ID} nodeId={course.ID} name={course.Course} type={'other'} highlightedNodes={highlightedNodes} setHighlightedNodes={setHighlightedNodes} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}