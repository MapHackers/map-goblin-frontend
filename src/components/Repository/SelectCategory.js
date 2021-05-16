import React from 'react';
import {Select, Tag} from "antd";
import {useDispatch} from "react-redux";
import {addSelectedCategory} from "../../_actions/repository_action";

const SelectCategory = (props) => {

    const dispatch = useDispatch()

    const options = [{ value: '대학교' }, { value: '맛집' }, { value: '정보전달' }, { value: '서울' }];

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

    return (
        <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{ width: '100%' }}
            options={options}
            onChange={onChange}
            defaultValue={props.categories}
        />
    );
};

export default SelectCategory;