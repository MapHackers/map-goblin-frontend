import React, { useState } from 'react';
import { Input } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const { Search } = Input;

function SearchByRepoName(props) {
  const [searchValue, setsearchValue] = useState('');
  const history = useHistory();
  const onChange = (event) => {
    setsearchValue(event.currentTarget.value);
  };

  const onSearch = (value, e) => {
    history.push(`/search?q=${value}`);
  };

  return (
    <SearchContainer>
      <Search
        placeholder="검색어를 입력해주세요."
        onSearch={onSearch}
        size="large"
        value={searchValue}
        onChange={onChange}
      />
    </SearchContainer>
  );
}

export default withRouter(SearchByRepoName);

const SearchContainer = styled.div`
  width: 37.5rem;
  height: 2rem;
  margin-top: 0.75rem;
  flex: none;
`;
