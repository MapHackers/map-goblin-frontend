import React from 'react';
import styled from 'styled-components';

function ExpandingText({ text, count }) {
  return (
    <ExpandedText>
      <div style={{ display: 'table-cell', paddingTop: '10px', color: 'black' }}>{text}</div>
      <div className="arrow">총 {count}개</div>
    </ExpandedText>
  );
}
//  style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1.5rem 3rem' }}

export default ExpandingText;

const ExpandedText = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  font-size: 2.2vw;
  vertical-align: bottom;
  .arrow {
    padding-left: 0.5vw;
    display: table-cell;
    color: black;
    font-size: 1vw;
    opacity: 0;
    transition: 1s all;
  }
  :hover .arrow {
    white-space: normal;
    display: table-cell;
    width: auto;
    opacity: 1;
  }
`;
