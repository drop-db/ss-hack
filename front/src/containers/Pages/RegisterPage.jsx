import React,{useContext} from 'react';
import {ContentContext} from "../../context/ContentContext";

export default function(props) {
    const {someContent} = useContext(ContentContext);
    return (
        <div>
            <h2>Register page</h2>
            {`Content from context: ${someContent}`}
        </div>
    );
}
