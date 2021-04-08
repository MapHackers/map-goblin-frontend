import React from 'react'
import { useSelector }from 'react-redux'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SepecificComponent){

    function Connect(props){
        let user = useSelector(state => state.user)
        console.log("connect", user)
        return(
            <SepecificComponent {...props} user={user} />
        )
    }
    return Connect
}