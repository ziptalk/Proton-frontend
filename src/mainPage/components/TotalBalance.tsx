import styled from '@emotion/styled';
import { formatPriceValue } from '../../common/utils/formatPriceValue';
import { IcDropdown } from '../assets/0_index';
import { useEffect, useState } from 'react';
import useQveToken from '../../common/hooks/useQveToken';

interface ITotalBalanceProps {
  totalBalance: number;
  domesticRate: number;
}

const SELECT_OPTION = {
  ALL: {
    unit: 'NTRN',
    label: 'All',
  },
  NTRN: {
    unit: 'NTRN',
    label: 'NTRN',
  },
  QVETOKEN: {
    unit: 'QVE token',
    label: 'QVE Token',
  },
};

const TotalBalance = ({ totalBalance, domesticRate }: ITotalBalanceProps) => {
  const [openSelectOption, setOpenSelectOption] = useState(false);
  const [selected, setSelected] = useState(SELECT_OPTION.NTRN);
  const qveTokenBalance = useQveToken();

  useEffect(() => {});

  const render = () => {
    switch (selected) {
      case SELECT_OPTION.ALL:
        return (
          <>
            <StTotalTokenValue>
              {qveTokenBalance &&
                formatPriceValue(qveTokenBalance + totalBalance)}{' '}
              {selected.unit}
            </StTotalTokenValue>
            <StTotalDollarValue>
              ≈ $
              {qveTokenBalance &&
                formatPriceValue(
                  (qveTokenBalance + totalBalance) * domesticRate
                )}
            </StTotalDollarValue>
          </>
        );
        break;
      case SELECT_OPTION.NTRN:
        return (
          <>
            <StTotalTokenValue>
              {formatPriceValue(totalBalance)} {selected.unit}
            </StTotalTokenValue>
            <StTotalDollarValue>
              ≈ ${formatPriceValue(totalBalance * domesticRate)}
            </StTotalDollarValue>
          </>
        );
        break;
      case SELECT_OPTION.QVETOKEN:
        return (
          <>
            <StTotalTokenValue>
              {qveTokenBalance && formatPriceValue(qveTokenBalance)}{' '}
              {selected.unit}
            </StTotalTokenValue>
            <StTotalDollarValue>
              ≈ $
              {qveTokenBalance &&
                formatPriceValue(qveTokenBalance * domesticRate)}
            </StTotalDollarValue>
          </>
        );
        break;
    }
  };

  return (
    <div>
      <StTitle>
        <label>Total Balance of</label>
        <StSelectToken onClick={() => setOpenSelectOption(!openSelectOption)}>
          <StSelected>
            <span>{selected.label}</span>
            <IcDropdown />
          </StSelected>
          {openSelectOption && (
            <StSelectOption>
              <span onClick={() => setSelected(SELECT_OPTION.ALL)}>All</span>
              <span onClick={() => setSelected(SELECT_OPTION.NTRN)}>
                {SELECT_OPTION.NTRN.label}
              </span>
              <span onClick={() => setSelected(SELECT_OPTION.QVETOKEN)}>
                {SELECT_OPTION.QVETOKEN.label}
              </span>
            </StSelectOption>
          )}
        </StSelectToken>
      </StTitle>
      {render()}
    </div>
  );
};

export default TotalBalance;

const StTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StSelectToken = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.white};
`;

const StSelected = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StSelectOption = styled.div`
  position: absolute;
  width: 8rem;
  top: 3rem;
  left: -0.5rem;
  padding: 0.5rem;
  gap: 1rem;
  display: flex;
  align-items: start;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.qve_background};

  & span {
    &:hover {
      color: ${({ theme }) => theme.colors.qve_blue};
    }
  }
`;

const StTotalTokenValue = styled.p`
  ${({ theme }) => theme.fonts.title_1};
`;

const StTotalDollarValue = styled.p`
  ${({ theme }) => theme.fonts.caption};
`;
