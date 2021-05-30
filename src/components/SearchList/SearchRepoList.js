import React from 'react'
import List from './List'
import {DislikeOutlined, DownloadOutlined, LikeOutlined} from "@ant-design/icons";
import {Image, Space} from "antd";
import Api from "../../util/Api";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

// userId 넘겨줘야함
function SearchRepoList({ Lists }) {
    return (
        <div className="ListWrapper"
             style={{height: "700px", overflow: "auto"}}
        >
            <div>{Lists}</div>
            <List
                itemLayout="horizontal"
                size="large"
                layout="vertical"
                dataSource={Lists}
                pagination={{
                    onChange: page => {
                    },
                    pageSize: 7,
                }}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-star-o" />,
                            <IconText icon={DislikeOutlined} text={item.dislikeCount} key="list-vertical-like-o" />,
                            <IconText icon={DownloadOutlined} text="2" key="list-vertical-message" />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Image
                                    width= '6rem'
                                    height= '6rem'
                                    alt="example"
                                    src={item.thumbnail ? Api.defaults.baseURL + '/files/' + item.thumbnail : "no-image.svg"}
                                    style={{borderRadius:"10%"}}
                                    preview={false}
                                />
                            }
                            title={
                                item.name
                                // <a href={`/${props.userId}/repositories/${item.name}`}
                                //    style={{fontSize:'16px'}}>
                                //     {item.name}
                                // </a>
                            }
                            description={item.description}
                        />
                    </List.Item>
                )}
            />

        </div>
    )
}

export default SearchRepoList