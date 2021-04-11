import React, { useState } from 'react'
import { Input } from 'antd'
import {withRouter} from 'react-router-dom';
import styled from 'styled-components'

const { Search } = Input;

function SearchByRepoName(props) {

    const [searchValue, setsearchValue] = useState('')

    const onChange = (event) => {
        setsearchValue(event.currentTarget.value)
    }

    const onSearch = (value, e) => {
        props.history.push(`/search?q=${value}`)
    }


    return (
        <SearchContainer>
            <Search placeholder="레포지토리명으로 검색" onSearch={onSearch} size="large" value={searchValue} onChange={onChange} />
        </SearchContainer>
    )
}

export default withRouter(SearchByRepoName)

const SearchContainer = styled.div`
    width: 37.5rem;
    height: 2rem;
    margin-top: 0.75rem;
    flex: none;
`