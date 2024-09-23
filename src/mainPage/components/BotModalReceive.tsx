import styled from '@emotion/styled';
import { IcNotice } from '../assets/0_index';
import { formatPriceValue } from '../../common/utils/formatPriceValue';

interface IReceiveProps {
  value: number;
}

const BotModalReceive = ({ value }: IReceiveProps) => {
  return (
    <StContainer>
      <StHeader>
        <span>Receive</span>
        <IcNotice />
      </StHeader>
      <StContent>
        <StLeftContent>
          <p>{formatPriceValue(value * 0.8) || 0}</p>
          <span />
          <StBalance>$100.93</StBalance>
        </StLeftContent>
        <StRightContent>
          <div>qveNTRN</div>
          <StBalance>Balance 0.00</StBalance>
        </StRightContent>
      </StContent>
    </StContainer>
  );
};

export default BotModalReceive;

const StContainer = styled.div`
  top: -2rem;
  width: 100%;
  padding: 1.4rem 1.5rem;
  border-radius: 6px;
  border: 0.1rem solid ${({ theme }) => theme.colors.not_important};
  background-color: #4f4f4f;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.9rem;

  ${({ theme }) => theme.fonts.body_3};
`;

const StHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  & > span {
    width: 30rem;
    height: 1px;
    background: linear-gradient(to right, #aeaeae, #4f4f4f);
  }
`;

const StRightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const StBalance = styled.p`
  ${({ theme }) => theme.fonts.caption};
`;
