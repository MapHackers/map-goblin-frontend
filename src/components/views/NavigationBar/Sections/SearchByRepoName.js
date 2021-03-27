import React from 'react'
import { Input } from 'antd'

const { Search } = Input;
const onSearch = value => console.log(value);

function SearchByRepoName() {
    return (
        <div style={{ width: 600, height: 30, float: 'right', marginTop: '20px', marginRight: '100px', flex: 'none'}}>
            <Search placeholder="레포지토리명으로 검색" onSearch={onSearch} size="large" />
        </div>
    )
}

export default SearchByRepoName
