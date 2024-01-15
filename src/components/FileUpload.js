import React from 'react';
import * as XLSX from 'xlsx';

export const FileUpload =  ({setClasses}) => {
    const handleFile = async (e) => {
        // Reads xls/xlsx file and turns it into an array of arrays
        const file = XLSX.read(await e.target.files[0].arrayBuffer());
        const sheet = file.Sheets[file.SheetNames[0]];
        const raw_data = XLSX.utils.sheet_to_json(sheet, {header:1});

        // Reads every course ID, it's state (undefined, Regularidad, Examen or Promoción) and grade
        // Inserts into map pairs of course ID and an array with state and grade
        const courseMap= {};
        var i = 14;
        const regExpId = /\(([^)]+)\)/; // regExp finds string between parentheses
        const regExpGrade = /[0-9.]+/; // regExp extracts the grade
        while(true){
            if(raw_data[i][0] === undefined){
                i += 5;
            }
            try{
                let codes = regExpId.exec(raw_data[i][0]);
                let state = raw_data[i][5];
                let grade = regExpGrade.exec(raw_data[i][4]);
                grade = ((grade.length === 0) ? grade : grade[0])
                courseMap[codes[0]] = [state, grade];
                i++;
            }
            catch(err){
                break;
            }
        }
        // console.log(courseMap)
        setClasses(JSON.stringify(courseMap))
    }
    return (
        <div className='file-upload'>
            <label>
                <form>
                    <input type="file" accept=".xls,.xlsx" onChange={handleFile}/>
                </form>
                Subir progreso actual
            </label>
        </div>
    )
}