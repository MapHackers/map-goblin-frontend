import React from 'react'
import { Input } from 'antd'

const { Search } = Input;

function MapsTap() {
    return (
        <div>
            <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <div style={{ width: '50%' }}>
                    <Search placeholder="내 지도 검색" size="large" />
                </div>
            </div>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: '550px', overflow: 'auto'}}>
                <div style={{ border: '1px solid gray', width: '100%', marginTop: '10px', minHeight: '100px', display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{ marginRight: 'auto', marginLeft: '10px'}}> 동작구 맛집 리스트 </h1>
                    <h3 style={{ marginRight: 'auto', marginLeft: '10px'}}> #동작구 #맛집 #밥집 </h3>
                </div>
                <div style={{ border: '1px solid gray', width: '100%', marginTop: '10px', minHeight: '100px', display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{ marginRight: 'auto', marginLeft: '10px'}}> 서울 근교 데이트코스 </h1>
                    <h3 style={{ marginRight: 'auto', marginLeft: '10px'}}> #경기도 #카페 #데이트코스 </h3>
                </div>
                <div style={{ border: '1px solid gray', width: '100%', marginTop: '10px', minHeight: '100px', display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{ marginRight: 'auto', marginLeft: '10px'}}> 팀플하기 좋은 카페 </h1>
                    <h3 style={{ marginRight: 'auto', marginLeft: '10px'}}> #팀플 #카페 #그룹 </h3>
                </div>
                <div style={{ border: '1px solid gray', width: '100%', marginTop: '10px', minHeight: '100px', display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{ marginRight: 'auto', marginLeft: '10px'}}> 중앙대 혼밥하기 좋은 밥집 </h1>
                    <h3 style={{ marginRight: 'auto', marginLeft: '10px'}}> #중앙대 #혼밥 </h3>
                </div>
            </div>
        </div>
    )
}
/*
            <div style={{ display: 'flex', flexDirection: 'column', height: '550px', border: '1px solid black', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '1.5px solid gray', flex: 'none' }}>
                    <div style={{ marginRight: 'auto' }}>
                        <h1> 동작구 커피 맛집 </h1>
                    </div>
                    <div style={{ marginRight: 'auto' }}>
                        <h2 style={{ color: 'gray' }}> # afsd #asdkfl #dklas </h2>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '1.5px solid gray', padding: '5px', flex: 'none' }}>
                    <div style={{ marginRight: 'auto' }}>
                        <h1> 동작구 커피 맛집 </h1>
                    </div>
                    <div style={{ marginRight: 'auto' }}>
                        <h2 style={{ color: 'gray' }}> # afsd #asdkfl #dklas </h2>
                    </div>
                </div>
            </div>
*/

export default MapsTap
