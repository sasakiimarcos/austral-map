import {Nodee} from "./Nodee";
import React from "react";

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
                        <h2>{`Año ${coursesGroup[0].Year}, Cuatri ${coursesGroup[0].Semester}`}</h2>
                        {coursesGroup.map(course => (
                            <div className='node-div'>
                                <Nodee key={course.ID} nodeId={course.ID} name={course.Course} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {otherCourses.map((courses) => (
                    <div key={courses[0]} className='other'>
                        <h2>{`${courses[0]}`}</h2>
                        {courses[1].map(course => (
                            <div className='other-div'>
                                <Nodee key={course.ID} nodeId={course.ID} name={course.Course} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}