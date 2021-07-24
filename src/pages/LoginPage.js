import React from 'react';
import styled from 'styled-components';
import FormFrame from '../components/Form/FormFrame';

const Container = styled.div`
  display: flex;
  background: #f5f6f7;
  position: relative;
  height: '100%;';
`;

function LoginPage() {
  return (
    <Container>
      <FormFrame FormType="Login" />
    </Container>
  );
}

export default LoginPage;
