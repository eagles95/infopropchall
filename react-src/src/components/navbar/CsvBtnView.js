import React from 'react';
import { FaUpload } from 'react-icons/fa';
export const CsvBtnView = (props) => {
    return(
        <div className="col-sm-12 col-md-3 upload-col">
            <label class="custom-file-upload">
                <input type="file" onChange={props.click}/>
                <FaUpload/>Upload .csv

            </label>
        </div>
    );
}