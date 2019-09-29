import React from 'react';
import {TextField as MaterialTextField} from '@material-ui/core';

function TextField(props) {
    const {maxLength, ...restProps} = props;
    return <MaterialTextField {...restProps} inputProps={{maxLength}}/>
}

export default TextField;