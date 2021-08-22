import React from 'react';
import styled from 'styled-components';
import MainImage from '../components/LandingFrame/MainImage';
import Footer from '../components/Footer/Footer';

const Container = styled.div`
  background: #f5f6f7;
  height: 100vh;
  background-image: url(/landing2.svg);
  background-size: 100%;
`;

function LandingPage() {
  return (
    <Container>
      <div>
        <MainImage />
        <Footer />
      </div>
    </Container>
  );
}

export default LandingPage;
