import React from 'react'
import styled from 'styled-components'

function ExpandingText() {
    return (
        <div class="expanded-text">
            <p class="text">
                <span class="short-name">On The Origin Of Species</span>
                <span class="longer-name">On The Origin Of Species By Means Of
                Natural Selection, Or The Preservation Of Favoured Races In
      The Struggle For Life</span>
            </p>
        </div>
    )
}

export default ExpandingText

const ExpandedText = styled.div`

`

const Text = styled.p`

`

const ShortName = 