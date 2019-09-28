import React from 'react';
import { Tabs as MaterialTabs, Tab as MaterialTab} from '@material-ui/core';

function Tab(props) {
    return <MaterialTab {...props} />
}
function Tabs(props){
    return <MaterialTabs {...props}/>
}

export default {
    Tab, Tabs
};