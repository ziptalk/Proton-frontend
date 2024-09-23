import { STCOMGlassWrapper } from '../../common/styles/commonStyleComs';
import SelectView, { VIEW } from '../components/SelectView';
import styled from '@emotion/styled';
import { LINK_SWAP } from '../constants/LINK_SWAP';

const Swap = () => {
  return (
    <StContainer>
      <SelectView view={VIEW.Swap} />
      <StContent>
        {LINK_SWAP.map((item) => {
          return (
            <StItem onClick={() => window.open(item.link)}>{item.name}</StItem>
          );
        })}
      </StContent>
    </StContainer>
  );
};

export default Swap;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const StContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 3rem;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }
`;

const StItem = styled(STCOMGlassWrapper)`
  min-width: 28rem;
  max-width: 38rem;
  min-height: 28rem;
  max-height: 38rem;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;
