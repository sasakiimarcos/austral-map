import React from 'react';
import * as XLSX from 'xlsx';

export const FileUpload =  () => {
    //
    const handleFile = async (e) => {
        // Reads xls/xlsx file and turns it into an array of arrays
        const file = XLSX.read(await e.target.files[0].arrayBuffer());
        const sheet = file.Sheets[file.SheetNames[0]];
        const raw_data = XLSX.utils.sheet_to_json(sheet, {header:1});

        // Reads every course ID and it's state (undefined, Regularidad, Examen or Promoción)
        // Inserts into map pairs of course ID and state
        const courseMap = new Map();
        var i = 14;
        const regExp = /\(([^)]+)\)/; // regEx finds string between parentheses
        while(true){
            if(raw_data[i][0] === undefined){
                i += 5;
            }
            try{
                let codes = regExp.exec(raw_data[i][0]);
                courseMap.set(codes[0], raw_data[i][5]);
                i++;
            }
            catch(err){
                break;
            }
        }
        return courseMap;
    }
    return (
        <div>
            <label>Subir progreso actual</label>
            <form>
                <input type="file" accept=".xls,.xlsx" onChange={handleFile}/>
            </form>
        </div>
    )
}