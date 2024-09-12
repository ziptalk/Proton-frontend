import styled from '@emotion/styled';
import { STCOMBlueBtn } from '../styles/commonStyleComs';
import { useNavigate } from 'react-router-dom';

const ErrorServer = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <StText1>500 NOT WORKING</StText1>
      <StSubText>
        Sorry, We had some technical probloms during your last operation.
      </StSubText>
      <StBtn onClick={() => navigate('/tradeBots')}>RETURN PAGE</StBtn>
    </StContainer>
  );
};

export default ErrorServer;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StText1 = styled.p`
  ${({ theme }) => theme.fonts.title_0};
`;

const StSubText = styled.p`
  ${({ theme }) => theme.fonts.body_3};
  width: 50rem;
  text-align: center;
`;

const StBtn = styled(STCOMBlueBtn)`
  width: fit-content;
  padding: 1rem 2rem;
`;
