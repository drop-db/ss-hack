import React, {useContext, useEffect} from "react";
import {ContentContext} from "../../../context/ContentContext";
import RegisterChildForm from "../../../components/Register/RegisterChildForm"

function ChildrenList() {
    const {getAllChildren, children} = useContext(ContentContext);
    useEffect(() => {
        getAllChildren();
    }, []);
    return <div>
        <h3>Children List</h3>
        { children.map(child => <div key={child.id}>{ `${child.firstName} ${child.secondName} ${child.birthday.toISOString()} ${child.orphanage}`} </div>)}
        <h3>Add child</h3>

        <RegisterChildForm/>
    </div>
}

export default ChildrenList