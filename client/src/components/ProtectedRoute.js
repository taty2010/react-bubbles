import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import BubblePage from './BubblePage';

const ProtectedRoute = ({component: Component, ...props}) => {
    return(
        <Route
            {...props}
            render={()=>{
                if (localStorage.getItem('token')){
                    return <Component/>
                }else{
                    return <Redirect to='/' />
                }
            }}

            />
    )
}

export default ProtectedRoute