import React, { useState } from 'react'
import { Tabs, Rate, Divider, Comment, Input, Form, Button, List, Image } from 'antd';
import { InfoCircleOutlined, CommentOutlined, HeartFilled } from '@ant-design/icons'
import { connect } from 'react-redux'
import Api from '../../util/Api';

const { TabPane } = Tabs;

const { TextArea } = Input;


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

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        pagination={{
            onChange: page => {
                console.log(page)
            },
            pageSize: 5
        }}
        renderItem={props => <Comment {...props} />}
    />
);

const MarkerDescription = ({ title, description, rating, userName, thumbnail }) => {

    const [reviewInput, setreviewInput] = useState("")
    const [value, setValue] = useState(null)
    const [reviewList, setreviewList] = useState([])
    const [submitting, setsubmitting] = useState(false)

    const handleReviewSubmit = () => {
        if (!reviewInput) {
            return
        }
        setsubmitting(true)
        setTimeout(() => {
            setsubmitting(false)
            setreviewList([
                {
                    author: <span style={{ display: 'flex' }}><p>{userName}</p> <Rate style={{ marginLeft: '16px', fontSize: '14px' }} disabled allowHalf value={value} /></span>,
                    content: <p>{reviewInput}</p>
                }, ...reviewList
            ])
            setreviewInput("")
        }, 100);
    }

    const handleRatingChange = async (value) => {
        setValue(value)
    }

    return (
        <div style={{ padding: '0', marginTop: '-25px' }}>
            <Tabs defaultActiveKey="1"
                tabBarGutter={100}>
                <TabPane tab={<span><InfoCircleOutlined /> Information </span>} key="1">
                    <div>
                        <h2> {title} </h2>
                        <Rate disabled allowHalf={true} value={rating} style={{ marginBottom: '25px' }} />
                        <Image preview={false} style={{width: '400px', marginLeft: '30px'}}src={Api.defaults.baseURL + '/files/' + thumbnail} alt="cau" fallback="../../no-image.svg"/>
                        <h3 style={{ marginTop: '25px' }}> {description} </h3>
                    </div>
                </TabPane>
                <TabPane tab={<span><CommentOutlined /> Review </span>} key="2">
                    <div>
                        <h2> {title} </h2>
                        <Rate character={<HeartFilled />} allowHalf allowClear={false} defaultValue={2} style={{ fontSize: '40px', marginBottom: '25px' }} onChange={handleRatingChange} />
                        <Divider style={{ marginTop: '0px' }}> Review </Divider>

                        <Comment
                            content={
                                <Editor
                                    onChange={(event) => { setreviewInput(event.currentTarget.value) }}
                                    onSubmit={handleReviewSubmit}
                                    submitting={submitting}
                                    value={reviewInput}
                                />
                            }
                        />
                        <CommentList key={Math.random()} comments={reviewList} />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

const mapStateToProps = state => ({
    userName: state.user.userName
})

export default connect(mapStateToProps)(MarkerDescription)
