import React from 'react'
import List from './List'

function SearchList({ Lists }) {
    return (
        <div className="ListWrapper"
            style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '60vh' }}
        >
            {Lists.map(aList => (
                <List title={aList.title} hashtag={aList.hashtag} likes={aList.likes} clones={aList.clones} image={aList.image}/>
            ))}

        </div>
    )
}

export default SearchList
