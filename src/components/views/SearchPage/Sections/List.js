import React from 'react'

function List({ title, hashtag, likes, clones, image }) {
    return (
        <div className="Wrapper"
            style={{ display: 'flex', width: '90%', margin: 'auto' }}
        >
            <div className="thumbnail" style={{ display: 'flex', marginLeft: '20px' }}>
                <img src={image} alt="" style={{ width: '200px', margin: 'auto' }} />
            </div>
            <div className="ListWrapper"
                style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', width: '650px' }}
            >
                <div className="reponame"
                    style={{ marginRight: 'auto', padding: '10px' }}
                >
                    <h1> {title} </h1>
                </div>
                <div className="hashtag"
                    style={{ marginRight: 'auto', color: 'gray', padding: '10px' }}
                >
                    <h2> {hashtag} </h2>
                </div>
                <div className="likesAndClones"
                    style={{ marginLeft: 'auto' }}
                >
                    {likes} likes {clones} clones
                </div>
            </div>
        </div>
    )
}

export default List
