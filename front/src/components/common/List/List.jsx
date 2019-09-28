import React from 'react';
import { List as ListMaterial, ListItem as ListItemMaterial } from '@material-ui/core';

function List(props) {
    return <ListMaterial {...props} />
}

function ListItem(props) {
    return <ListItemMaterial {...props} />
}
export default {List, ListItem};