import styled from '@emotion/styled';
import { STCOMBlueBtn } from '../styles/commonStyleComs';
import { useNavigate } from 'react-router-dom';

const ErrorNotFound = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <StText1>404 PAGE NOT FOUND</StText1>
      <StSubText>
        Sorry, The page you were looking for appears to have been moved, deleted
        or does not exist.
      </StSubText>
      <StBtn onClick={() => navigate('/onboarding')}>GO HOME</StBtn>
    </StContainer>
  );
};

export default ErrorNotFound;

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
