import React, {useEffect, useState} from 'react';
import {Select, Spin, Tag} from "antd";
import {useDispatch} from "react-redux";
import {addSelectedCategory, selectCategoryList} from "../../_actions/repository_action";

const SelectCategory = (props) => {

    const dispatch = useDispatch()

    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        dispatch(selectCategoryList(`/categories`))
            .then(response => {
                setOptions(response.payload.data);
                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const tagRender = (props) => {
        const { label, closable, onClose } = props;

        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color='geekblue'
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        );
    };

    const onChange = (value) => {
        dispatch(addSelectedCategory(value));
    }

    if(isLoading){
        return (
            <Select
                mode="tags"
                showArrow
                tagRender={tagRender}
                style={{ width: '100%' }}
                options={options}
                onChange={onChange}
                placeholder="새로운 카테고리를 입력할 수 있습니다!"
                defaultValue={props.categories}
            />
        );
    }else{
        return (
            <div style={isLoading ? null : { textAlign: "center", lineHeight: "100vh", height: "100vh" }}>
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }
};

export default SelectCategory;