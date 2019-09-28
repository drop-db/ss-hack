import React, {useContext, useRef, useEffect} from 'react';
import {withRouter} from 'react-router';

function UserPage (props){
     console.log(props.history);
     return   <div><h2>User Page</h2></div>
}



export default withRouter(UserPage)