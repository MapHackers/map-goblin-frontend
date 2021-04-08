import React, { useState } from 'react'
import { Input } from 'antd'
import {withRouter} from 'react-router-dom';

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
        <div style={{ width: 600, height: 30, float: 'right', marginTop: '20px', marginRight: '100px', flex: 'none' }}>
            <Search placeholder="레포지토리명으로 검색" onSearch={onSearch} size="large" value={searchValue} onChange={onChange} />
        </div>
    )
}

export default withRouter(SearchByRepoName)
