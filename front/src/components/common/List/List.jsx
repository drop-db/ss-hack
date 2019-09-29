import React from 'react';
import { List as ListMaterial, ListItem as ListItemMaterial, ListItemAvatar as MaterialAvatar, ListItemText as MaterialText} from '@material-ui/core';


function List(props) {
    return <ListMaterial {...props} />
}

function ListItemAvatar(props) {
    return <MaterialAvatar {...props} />
}

function ListItem(props) {
    return <ListItemMaterial {...props} />
}

function ListItemText(props) {
    return <MaterialText {...props} />
}

export default {List, ListItem, ListItemText, ListItemAvatar };