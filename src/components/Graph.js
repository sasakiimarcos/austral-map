import {Nodee} from "./Nodee";
import React from "react";

export const Graph = ({ courses }) =>  {
    return (
        <div>
            {courses.map(course => (
                <Nodee nodeId={course.ID} name={course.Course}/>
                // <div key={course.ID}>
                //     <h2>{course.Course}</h2>
                //     <p>ID: {course.ID}</p>
                //     <p>Year: {course.Year}</p>
                //     <p>Semester: {course.Semester}</p>
                //     <p>Credits: {course.Credits}</p>
                //     {/* Add more fields as needed */}
                // </div>
            ))}
        </div>
    );
}