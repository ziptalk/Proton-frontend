import styled from '@emotion/styled';
import { IcModalX, IcNotice } from '../assets/0_index';
import AreaChart from './AreaChart';
import {
  STCOMBackground,
  STCOMBlueBtn,
} from '../../common/styles/commonStyleComs';
import DropDown from './DropDown';
import { useEffect, useRef, useState } from 'react';
import { IPnlChart } from '../types/pnlChartType';
import { DEPOSIT_PLACEHOLDER } from '../constants/DEPOSIT_PLACEHOLDER';
import { formatNumberWithCommas } from '../../common/utils/formatNumberWithCommas';
import { formatPercentValue } from '../../common/utils/formatPercentValue';
import { getBalance } from '../../common/utils/getBalance';
import useOutsideClick from '../../common/hooks/useOutsideClick';
import { depositTransfer } from '../../contract/deposit';
import { slideUp } from '../../common/utils/animation';
import IconTriangleDown from '../../common/assets/IconTriangleDown';
import IconTriangleUp from '../../common/assets/IconTriangleUp';
import instance from '../../common/apis/instance';
import BotModalReceive from './BotModalReceive';
import { parseNumber } from '../../common/utils/parseNumber';
import { RingLoader } from 'react-spinners';

const base_url = import.meta.env.VITE_BASE_URL;
const MINVAL = 10;
const BotModal = ({
  isOpen,
  onClose,
  botId,
  showToast,
  onDataRefreshRequest,
}: {
  isOpen: boolean;
  onClose: () => void;
  botId: string | null;
  showToast: (message: string) => void;
  onDataRefreshRequest: () => void;
}) => {
  const [depositValue, setDepositValue] = useState<string>('');
  const [placeholder, setPlaceholder] = useState(DEPOSIT_PLACEHOLDER.default);
  const [data, setData] = useState<IPnlChart>();
  const [balance, setBalance] = useState('-');
  const [user_id, setUserId] = useState(localStorage.getItem('NEUTRONADDRESS'));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState('Staking');
  const [isFocused, setIsFocused] = useState(false);
  useOutsideClick(wrapperRef, onClose);

  useEffect(() => {
    // if (!user_id) return;
    setUserId(localStorage.getItem('NEUTRONADDRESS'));
    getData();
    if (!localStorage.getItem('NEUTRONADDRESS')) {
      setPlaceholder(DEPOSIT_PLACEHOLDER.notConnectWallet);
    }
    fetchBalance();
  }, []);
  if (!isOpen) return null;

  const fetchBalance = async () => {
    if (!user_id) return;
    const b = await getBalance(user_id);
    setBalance(b);
    if (parseNumber(b) < MINVAL) setIsLoading('Insufficient balance');
  };

  const getData = async () => {
    try {
      const { data } = await instance.get(
        `${base_url}/api/PnLChart?bot_id=${botId}&user_id=${user_id}&timeframe=5`
      );
      // if (data.Available === 0) {
      //   setPlaceholder(DEPOSIT_PLACEHOLDER.lackOfMoney);
      // }
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepositValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (parseNumber(rawValue) > parseNumber(balance)) {
      setDepositValue(balance);
      return;
    }
    const formatValue = formatNumberWithCommas(rawValue);
    setDepositValue(formatValue);
  };

  const deposit = async (id: string | null) => {
    if (!id) return;
    const base_url = import.meta.env.VITE_BASE_URL;
    if (!localStorage.getItem('NEUTRONADDRESS') || !depositValue) return;
    const _amount = Number(depositValue.replace(/,/g, ''));
    try {
      setIsLoading('Open Wallet...');
      await depositTransfer(_amount);
      setIsLoading('Depositing...');
      const postData = {
        user_id: localStorage.getItem('NEUTRONADDRESS'), // 지갑 주소
        bot_id: id,
        amount: _amount, // 입금할 금액
      };
      await instance.post(`${base_url}/api/deposit`, postData);
      onClose();
      setIsLoading('Deposit');
      showToast('Your deposit has been successfully completed!');
      onDataRefreshRequest();
    } catch (err) {
      setIsLoading('Deposit');
      console.log(err);
    }
  };

  return data ? (
    <StBotModalBackGround>
      <StScroll>
        <StWrapper ref={wrapperRef}>
          <StSpaceBetween>
            <StModalTitle>{data.bot_name}</StModalTitle>
            <IcModalX onClick={onClose} style={{ cursor: 'pointer' }} />
          </StSpaceBetween>
          <StModalExplain>
            Cyclic arb bot automatically captures recurring price discrepancies
            between multiple exchanges, operating 24/7.
          </StModalExplain>
          <StColumn>
            <StSpaceBetween>
              <StModalLabel>Investment</StModalLabel>
              <StAvailable>
                <span>Available:</span> {balance}
                NTRN
              </StAvailable>
            </StSpaceBetween>
            <StinputContainer isFocused={isFocused || depositValue.length > 0}>
              <input
                placeholder={placeholder}
                value={depositValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleDepositValue}
              />
              <button onClick={() => setDepositValue(balance)}>Max</button>
            </StinputContainer>
            {(isFocused || depositValue) && (
              <BotModalReceive
                value={parseNumber(depositValue)}
                domesticRate={data.domesticRate}
              />
            )}
          </StColumn>
          <StGraphContaienr>
            <StPnlWrapper>
              {data.daily_PnL >= 0 ? <IconTriangleUp /> : <IconTriangleDown />}
              <StPnl isPositive={data.daily_PnL >= 0}>
                {formatPercentValue(data.daily_PnL)}%
              </StPnl>
              <span>1D</span>
            </StPnlWrapper>
            <AreaChart chartData={data.data} />
          </StGraphContaienr>
          <DropDown detailData={data.detailInformation} />
          <StDepositBtn
            disabled={
              placeholder !== DEPOSIT_PLACEHOLDER.default ||
              !depositValue ||
              Number(depositValue.replace(/,/g, '')) < MINVAL
            }
            onClick={() => deposit(botId)}
          >
            {balance !== '-' ? (
              <p>{isLoading}</p>
            ) : (
              <RingLoader size='30' color='#ffffff' />
            )}
          </StDepositBtn>
          <StModalNotice>
            <IcNotice />
            <span>
              You are using a shared parameter. As market conditions differ,
              these parameters cannot guarantee the same results.
            </span>
          </StModalNotice>
          <StNoticeP>
            If you remove the bot, a 20% fee on the revenue it generated will be
            charged.
          </StNoticeP>
        </StWrapper>
      </StScroll>
    </StBotModalBackGround>
  ) : (
    <>loading...</>
  );
};

export default BotModal;

const StBotModalBackGround = styled(STCOMBackground)`
  @media (${({ theme }) => theme.breakpoints.mobile}) {
    align-items: end;
  }
`;

const StScroll = styled.div`
  overflow-y: auto;
  width: 56rem;
  max-height: 80rem;
  height: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.invest_background};
  z-index: 4;
  padding: 2.4rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
  @media (${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    animation: ${slideUp} 0.5s ease-out;
  }
`;

const StWrapper = styled.div`
  width: 100%;
  min-height: 69.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;

  & > * {
    width: 100%;
  }
`;

const StSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StModalTitle = styled.p`
  ${({ theme }) => theme.fonts.body_2};
  color: ${({ theme }) => theme.colors.white};
`;

const StModalExplain = styled.p`
  ${({ theme }) => theme.fonts.small_phrase};
  color: ${({ theme }) => theme.colors.sub_white};
`;

const StColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StModalLabel = styled.label`
  ${({ theme }) => theme.fonts.body_2};
  color: ${({ theme }) => theme.colors.white};
`;

const StAvailable = styled.p`
  ${({ theme }) => theme.fonts.body_3};
  color: ${({ theme }) => theme.colors.white};

  & > span {
    color: ${({ theme }) => theme.colors.not_important};
  }
`;

const StinputContainer = styled.div<{ isFocused: boolean }>`
  width: 100%;
  height: ${({ isFocused }) => (isFocused ? '6rem' : '5rem')};
  padding: 1.4rem 1.5rem;
  border-radius: 6px;
  border: 0.1rem solid ${({ theme }) => theme.colors.not_important};
  background-color: #4f4f4f;
  position: relative;

  & > input {
    width: 80%;
    background-color: transparent;
    border: none;
    ${({ theme }) => theme.fonts.body_3};
    outline: none;
    color: ${({ theme }) => theme.colors.white};
  }

  & > button {
    position: absolute;
    right: 1.1rem;
    top: 1rem;
    width: 6.6rem;
    height: 3rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.sub_white};
    background: linear-gradient(
      144deg,
      rgba(255, 255, 255, 0.1) -9.46%,
      rgba(255, 255, 255, 0.25) 115.25%
    );
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const StGraphContaienr = styled.div`
  position: relative;
  width: 100%;
  height: 27.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StPnlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${({ theme }) => theme.fonts.caption};

  & > span {
    color: ${({ theme }) => theme.colors.not_important};
  }
`;

const StPnl = styled.p<{ isPositive: boolean }>`
  color: ${({ theme, isPositive }) =>
    isPositive ? theme.colors.positive : theme.colors.negative};
  &::before {
    content: ${({ isPositive }) =>
      isPositive ? `${(<IconTriangleUp />)}` : `${(<IconTriangleDown />)}`};
  }
`;

const StDepositBtn = styled(STCOMBlueBtn)<{ disabled: boolean }>`
  width: 100%;
  min-height: 4.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* ${(props) => props.disabled && ' background-color: #ccc'}; */
  background-color: ${({ theme }) => theme.colors.qve_blue};
  ${({ disabled }) => disabled && 'opacity:0.6'};
`;

const StModalNotice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* height: 5.8rem; */
  background-color: #4f4f4f;
  padding: 1.2rem 2.4rem;
  ${({ theme }) => theme.fonts.caption};
  gap: 0.9rem;
  line-height: 120%;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StNoticeP = styled.p`
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.fonts.index_steptitle};
  color: ${({ theme }) => theme.colors.not_important};
`;
