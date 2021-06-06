import React, {useEffect, useState} from 'react';
import {Comment, List, Avatar, Col, Row, Form, Button, Table, Tag, Input} from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import CommonLayout from "../components/Layout/CommonLayout";
import TextArea from "antd/es/input/TextArea";
import Api from "../util/Api";
import RequestForm from "../components/Repository/RequestForm";

const data = [
    {
        author:'doil',
        profile: 'NoProfile.png',
        content:'hello'
    },
    {
        author:'doil',
        profile: 'NoProfile.png',
        content:'hello'
    }
]

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} placeholder="리뷰를 입력해 주세요" />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

function alarmCalculate(date) {
    const cur_date = new Date();
    const time_val = cur_date.getTime() - Date.parse(date)
    const min = 60000
    const hour = 3600000
    const day = 86400000
    const week = day * 7
    const month = day * 30
    const year = day * 365

    if (time_val < min) return '방금 전'
    else if (time_val < hour) return Math.round(time_val / min) + '분 전'
    else if (time_val < day) return Math.round(time_val / hour) + '시간 전'
    else if (time_val < week) return Math.round(time_val / day) + '일 전'
    else if (time_val < month) return Math.round(time_val / week) + '주 전'
    else if (time_val < year) return Math.round(time_val / month) + '개월 전'
    else return Math.round(time_val / year) + '년 전'
}

function getDate(isoDate) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const createdDate = isoDate.split(/-|T/);
    const year = createdDate[0];
    const month = months[parseInt(createdDate[1])]
    const date = parseInt(createdDate[2]).toString();

    return year + ', ' + month + ' ' + date;
}

const CommentList = ({ comments }) => (
    <List
        className="comment-list"
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
            <li>
                <Comment
                    author={item.author}
                    avatar={item.profile ? `${Api.defaults.baseURL}/files/${item.profile}` : `${Api.defaults.baseURL}/files/NoProfile.png`}
                    content={item.content}
                    datetime={alarmCalculate(item.createdDate)}
                />
            </li>
        )}
    />
)

const IssueDetailPage = (props) => {
    const [review, setReview] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [title, setTitle] = useState('')
    const [issueContent, setIssueContent] = useState('')
    const [reviewList, setReviewList] = useState([])
    const [author, setAuthor] = useState('')
    const [profile, setProfile] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const {userId, repositoryName, issue} = props.match.params


    useEffect(() => {

        async function getIssueInfo() {
            setIsLoading(true)
            await Api.get(props.location.pathname)
                .then(response => {
                    let temp = []
                    setTitle(response.data.title)
                    setIssueContent(response.data.content)
                    setReviewList(response.data.issueReviewList)
                    setAuthor(response.data.authorName)
                    setProfile(response.data.authorProfile)
                    setStatus(response.data.status)
                    setDate(response.data.createdDate)

                    response.data.issueReviewList.map((review) => {
                        temp.push(
                            {
                                author: review.author,
                                content: review.content,
                                profile: review.profile,
                                createdDate: review.createdDate

                            }
                        )
                    })
                    setIsLoading(false)
                })
                .catch(err => err.response)
        }
        getIssueInfo().then()
    }, [])

    const handleSubmit = async () => {
        if (!review) {
            return
        }
        let dataToSubmit = {
            "author": props.user.userName,
            "content": review,
            "profile":props.user.profile
        }
        console.log("REVIEW", dataToSubmit)
        await Api.post(props.location.pathname, dataToSubmit)
            .then(response => console.log(response))
            .catch(e => console.log(e))

        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            const a = new Date().getTimezoneOffset() * 60000
            const today = new Date(Date.now() - a)
            setReviewList([
                ...reviewList,
                {
                    author: props.user.userName,
                    content: review,
                    profile: props.user.profile,
                    createdDate: today.toISOString()
                }
            ])
            setReview("")
        }, 100)
    }

    const checkIssue = async () => {
        await Api.post(props.location.pathname + '/check')
            .then(response => {
                props.history.push(`/${userId}/repositories/${repositoryName}`)
            })
            .catch(err => err.response)
    }

    return (
        <>
            {
                !isLoading &&
                <CommonLayout>
                    <Row style={{textAlign:'left'}}>
                        <Col span={5}></Col>
                        <Col span={14}>


                            <RequestForm>
                                <div style={{marginTop:'20px'}}>
                                    <b>작성자 :</b>
                                    <Avatar src={profile ? `${Api.defaults.baseURL}/files/${profile}` : `${Api.defaults.baseURL}/files/NoProfile.png`}
                                            size={20}
                                            shape='circle'
                                            style={{marginLeft:'10px', marginRight:'5px'}}
                                    />
                                    <span>{author}</span>
                                    <span style={{float:'right', color:'#808080'}}>
                                        <b style={{marginRight:'10px'}}>작성일자 : </b>
                                        {getDate(date)}
                                    </span>
                                </div>

                                {props.user.userId === userId &&
                                <div style={{marginTop:'40px', marginLeft:'auto', float:'right'}}>
                                    {
                                        status === 'CHECKED' &&
                                        <Tag style={{width:'100%', textAlign:'center'}} color='blue' icon={<CheckCircleOutlined/>}>OK</Tag>
                                    }
                                    {
                                        status === "WAITING" &&
                                        <div>
                                            <Tag style={{width:'100%', textAlign:'center'}} color='gold' icon={<ClockCircleOutlined />}>Waiting</Tag>
                                            <div>
                                                <Button type='primary' style={{marginTop:'20px', width:'100%'}} onClick={checkIssue}><CheckCircleOutlined/>확인</Button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                }
                                <Form.Item
                                    label="지적 제목"
                                    name="title"
                                    initialValue={title}
                                    style={{marginTop:'40px', width: '85%'}}
                                >
                                    <Input style={{color: "black"}} disabled/>
                                </Form.Item>
                                <Form.Item
                                    label="지적 내용"
                                    name="content"
                                    initialValue={issueContent}
                                    style={{width: '85%'}}
                                >
                                    <TextArea style={{color: "black"}} rows={10} disabled/>
                                </Form.Item>
                            </RequestForm>

                            {/*<Table pagination={false}*/}
                            {/*       dataSource={[{key:'1', content: `${issueContent}`, height:'100px', columnWidth:"400px"}]}*/}
                            {/*       columns={[{title: `${title}`, dataIndex:'content'}]}*/}
                            {/*       footer={() => (*/}
                            {/*           <>*/}
                            {/*               <b>작성자 : </b>*/}
                            {/*               <Avatar src={profile ? `${Api.defaults.baseURL}/files/${profile}` : `${Api.defaults.baseURL}/files/NoProfile.png`}*/}
                            {/*                       size={20}*/}
                            {/*                       shape='circle'*/}
                            {/*                       style={{marginLeft:'10px', marginRight:'5px'}}*/}
                            {/*               />*/}
                            {/*               {author}*/}
                            {/*           </>*/}
                            {/*       )}*/}
                            {/*/>*/}
                            <CommentList key={Math.random} comments={reviewList} />
                            <Comment
                                avatar={
                                    <Avatar
                                        src={profile ? `${Api.defaults.baseURL}/files/${profile}` : `${Api.defaults.baseURL}/files/NoProfile.png`}
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={(event) => {setReview(event.currentTarget.value)}}
                                        onSubmit={handleSubmit}
                                        submitting={submitting}
                                        value={review}
                                    />
                                }
                            />
                        </Col>
                        <Col span={5}></Col>
                    </Row>
                </CommonLayout>
            }
        </>
    );
};


export default IssueDetailPage;