import React from 'react';

export const FileUpload =  () => {
    return (
        <div>
            <label>Subir progreso actual</label>
            <form>
                <input type="file" accept=".xls,.xlsx"/>
            </form>
        </div>
    )
}