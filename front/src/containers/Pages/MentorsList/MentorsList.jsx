import React, {useContext, useEffect} from "react";
import {ContentContext} from "../../../context/ContentContext";


function MentorsList() {
    const {getAllMentors} = useContext(ContentContext);
    useEffect(() => {
        getAllMentors();
    }, []);
    return <div>MentorsList</div>
}

export default MentorsList