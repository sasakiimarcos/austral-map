import {Nodee} from "./Nodee";
import React from "react";
import {Edge} from "./Edge";



export const Graph = ({ courses }) =>  {

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

    console.log(otherCourses[0][1])

    delete groupedCourses['Electives-null']
    delete groupedCourses['Other Requirements-null']

    return (
        <div className='courses-container'>
            <div className='semester-container'>
                {Object.entries(groupedCourses).map(([key, coursesGroup]) => (
                    <div key={key} className='semester'>
                        <h2 style={{color:'#dedede'}}>{`${(coursesGroup[0].Year - 1) * 2 + coursesGroup[0].Semester}C`}</h2>
                        {coursesGroup.map(course => {
                            const regex = /\(([^,]+),\s*Regularizada\)/g;

                            const codesList = [];
                            let match;
                            while ((match = regex.exec(course['Prerequisites to Take'])) !== null) {
                                const code = match[1];
                                codesList.push(code);
                            }

                            return (
                                <div className='node-div'>
                                    <Nodee key={course.ID} nodeId={course.ID} name={course.Course} type={'course'}/>
                                    {codesList.map(prerequisite => (
                                        <Edge start={prerequisite} end={course.ID}/>
                                    ))}
                                </div>
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
                                    <Nodee key={course.ID} nodeId={course.ID} name={course.Course} type={'elective'} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}