import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../_actions/user_action'

function withAuthHoc(SepecificComponent, option) {

    /* 
    option
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입이 가능한 페이지
    false => 로그인한 유저는 출입 불가능한 페이지
    */

    function AuthenticationCheck(props) {
        const dispatch = useDispatch()
        //backend에 auth요청
        useEffect(() => {
            dispatch(auth(window.localStorage.getItem("userToken")))
                .then(response => {
                    //분기처리
                    //로그인 하지 않은 상태
                    if (option === null){
                        console.log("anyone can access")
                    }
                    else if (option === true){
                        if(response.payload.status !== 200){
                            alert('로그인이 필요합니다!')
                            props.history.push('/login')
                        }
                    }
                    else if(option === false){
                        if(response.payload.status === 200){
                            alert('접근 불가능!')
                            props.history.goBack()
                        }
                    }
                })
        }, [dispatch, props.history])
        let user = useSelector(state => state.user)

        return(
            <SepecificComponent {...props} user={user}/>
        )
    }
    return AuthenticationCheck
}

export default withAuthHoc