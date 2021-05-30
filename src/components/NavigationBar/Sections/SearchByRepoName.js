import React, {useEffect, useState} from 'react'
import { Input } from 'antd'
import {withRouter} from 'react-router-dom';
import styled from 'styled-components'
import {useDispatch} from "react-redux";
import {searchRepository, searchUser} from "../../../_actions/search_action";

const { Search } = Input;

function SearchByRepoName(props) {

    const [searchValue, setsearchValue] = useState('')

    const dispatch = useDispatch()

    const onChange = (event) => {
        setsearchValue(event.currentTarget.value)
    }

    const onSearch = (value, e) => {
        props.history.push(`/search?q=${value}`)

        dispatch(searchUser(searchValue))
            .then(response => console.log("FIND USER",response))
        dispatch(searchRepository(searchValue))
            .then(response => console.log("FIND SEARCH",response))
    }


    return (
        <SearchContainer>
            <Search placeholder="지도명으로 검색" onSearch={onSearch} size="large" value={searchValue} onChange={onChange} />
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