import React, {useEffect, useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import ProfileContainer from "../components/Profile/ProfileContainer";
import MypageTabContainer from "../components/MypageTab/MypageTabContainer";
import {Row, Col, Result, Button, Spin} from 'antd';
import {useSelector, useDispatch} from "react-redux";
import {loadUser} from "../_actions/userInfo_action";

const MyPage = (props) => {

    const userId = props.location.pathname.replace('/', '')

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false)

    const user = useSelector(state => state.user);

    const backHome = () => {
        props.history.push('/main')
    }

    useEffect(() => {
        dispatch(loadUser(userId))
            .then(response => {
                if (response.payload.status === 404) {
                    setNotFound(true)
                } else {
                    setIsLoading(false)
                }
            })
            .catch(err => err.response)
    }, [])

    if (!isLoading) {
        return(
            <CommonLayout>
                <div id="testlayout" style={{margin: "50px 0px 20px 10px", height: "100%"}}>
                    <Row>
                        <Col flex="250px" style={{marginLeft: "100px", marginRight: "50px", height: "100%"}}>
                            <ProfileContainer user={user} style={{height: "100%"}}/>
                        </Col>
                        <Col flex="auto">
                            <MypageTabContainer name={user.userName} userId={user.userId} user={user}/>
                        </Col>
                    </Row>
                </div>
            </CommonLayout>
            )
    } else {
        return (
            <div style={isLoading && notFound ? null : { textAlign: "center", lineHeight: "100vh", height: "100vh" }}>
                {isLoading && notFound ? <Result
                    status="404"
                    title="404"
                    subTitle="존재하지 않는 페이지입니다."
                    extra={<Button type="primary" onClick={backHome}>홈으로</Button>}
                /> : <Spin size="large" tip="Loading..." />}
            </div>
        )
    }
    // return (
    //     <>
    //         {
    //             !isLoading &&
    //             <CommonLayout>
    //                 <div id="testlayout" style={{margin: "50px 0px 20px 10px", height: "100%"}}>
    //                     <Row>
    //                         <Col flex="250px" style={{marginLeft: "100px", marginRight: "50px", height: "100%"}}>
    //                             <ProfileContainer user={user} style={{height: "100%"}}/>
    //                         </Col>
    //                         <Col flex="auto">
    //                             <MypageTabContainer name={user.userName} userId={user.userId} user={user}/>
    //                         </Col>
    //                     </Row>
    //                 </div>
    //             </CommonLayout>
    //         }
    //     </>
    //
    // );
};

export default MyPage;