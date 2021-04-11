import React from 'react'
import NavBar from ''
import qs from 'qs'
import SearchLists from './Sections/SearchList'

const Lists = [
    {
        title: "알바생이 친절한 편의점",
        hashtag: "#동작구 #편의점",
        likes: 123,
        clones: 23,
        image: '/2.png'
    },
    {
        title: "내가 직접 가본 친절하게 상담해주는 병원",
        hashtag: "#친절 #의사 #병원리스트",
        likes: 441,
        clones: 101,
        image: '/1.png'
    }

]

function SearchPage({ location }) {

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const searchValue = `${query.q}`

    return (
        <div>
            <NavBar />
            <div style={{ marginTop: '20px', marginRight: 'auto'}}>
                <h1> "{searchValue}" 키워드에 대한 검색 결과입니다.</h1>
            </div>
            <SearchLists Lists={Lists} />
        </div>
    )
}

export default SearchPage
