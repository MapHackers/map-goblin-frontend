import React from 'react';
import { Button } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';

function ButtonBox() {
  const history = useHistory();
  return (
    <ButtonContainer>
      <Button
        type="primary"
        style={{
          marginTop: '0.6rem',
          height: '2.6rem',
        }}
        size="large"
        onClick={() => {
          history.push(`/new`);
        }}
      >
        내 지도 만들기
      </Button>
    </ButtonContainer>
  );
}

export default withRouter(ButtonBox);

const ButtonContainer = styled.div`
  height: 4rem;
  flex: none;
`;
