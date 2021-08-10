import React, { useCallback, useEffect } from 'react';
import { Select, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { repositoryActions } from '../../store/repository';
import { getCategoryOptionsAPI } from '../../util/api/repository';

const SelectCategory = (props) => {
  const dispatch = useDispatch();

  const categoryOptions = useSelector((state) => state.repository.categoryOptions);
  const myCategory = useSelector((state) => state.repository.categories);

  const init = useCallback(async () => {
    const response = await getCategoryOptionsAPI();
    dispatch(repositoryActions.setCategoryOptions(response.data));
    dispatch(repositoryActions.setModifyCategory(myCategory));
  }, [dispatch, myCategory]);

  useEffect(() => {
    init();
  }, [init]);

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color="geekblue"
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
    console.log(value);
    dispatch(repositoryActions.setModifyCategory(value));
  };

  return (
    <Select
      mode="tags"
      showArrow
      tagRender={tagRender}
      style={{ width: '100%' }}
      options={categoryOptions}
      onChange={onChange}
      placeholder="새로운 카테고리를 입력할 수 있습니다!"
      defaultValue={props.categories}
    />
  );
};

export default SelectCategory;
