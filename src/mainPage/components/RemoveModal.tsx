import {
  STCOMBackground,
  STCOMBlueBtn,
  STCOMGreyBtn,
} from '../../common/styles/commonStyleComs';
import styled from '@emotion/styled';
import { IcModalX } from '../assets/0_index';
import axios from 'axios';
import { useRef, useState } from 'react';
import useOutsideClick from '../../common/hooks/useOutsideClick';
import instance from '../../common/apis/instance';
import useQveToken from '../../common/hooks/useQveToken';
import { useNavigate } from 'react-router-dom';
import { removeTokens } from '../../contract/remove';
import { useQueryClient } from '@tanstack/react-query';

const RemoveModal = ({
  isOpen,
  onClose,
  botId,
  totalInvest,
}: {
  isOpen: boolean;
  onClose: () => void;
  botId?: string | null;
  totalInvest: number | null;
}) => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, onClose);
  const [isLoading, setIsLoading] = useState(false);
  const qveTokenBalance = useQveToken();
  const queryClient = useQueryClient();
  const [address] = useState(localStorage.getItem('NEUTRONADDRESS'));
  if (!isOpen || !totalInvest || !qveTokenBalance) return;

  const remove = async () => {
    if (!address) return;
    const base_url = import.meta.env.VITE_BASE_URL;

    const postBody = {
      user_id: address,
      bot_id: botId,
    };
    try {
      setIsLoading(true);
      await removeTokens(totalInvest * 0.8);
      await instance.post(`${base_url}/api/remove`, postBody);
      onClose();
      setIsLoading(false);

      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        err.response.status === 499 &&
          alert('You can remove this bot after 3 days of deposing!');
        return;
      }
    }
  };

  return (
    <STCOMBackground>
      <StWrapper ref={wrapperRef}>
        <StTop>
          <div />
          <IcModalX onClick={onClose} style={{ cursor: 'pointer' }} />
        </StTop>
        {totalInvest * 0.8 <= qveTokenBalance ? (
          <StMiddle>
            <span>Are you sure you want to stop the</span>
            <span>Cyclic Arb BOT and close your trades?</span>
          </StMiddle>
        ) : (
          <StMiddle>
            <span>
              Since there is no qveNTRN(QVE Token) provided as collateral,
            </span>
            <span>please exchange additional NTRN on the DEX</span>
          </StMiddle>
        )}
        <StBottom>
          {totalInvest * 0.8 <= qveTokenBalance ? (
            <StRemoveBtn onClick={remove}>
              {isLoading ? 'Removing Bot..' : 'Remove'}
            </StRemoveBtn>
          ) : (
            <StSwqpBtn
              onClick={() => {
                onClose();
                navigate('/swap');
              }}
            >
              Go to DEX
            </StSwqpBtn>
          )}
        </StBottom>
      </StWrapper>
    </STCOMBackground>
  );
};

export default RemoveModal;

const StWrapper = styled.div`
  width: 56rem;
  height: 25.2rem;
  border-radius: 16px;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.invest_background};
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > * {
    width: 100%;
  }
`;

const StTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.fonts.body_2};
`;

const StMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fonts.small_phrase};
`;

const StBottom = styled.div`
  display: flex;
  justify-content: end;
`;

const StRemoveBtn = styled(STCOMGreyBtn)`
  width: 14.7rem;
  height: 4.5rem;
  ${({ theme }) => theme.fonts.caption};
`;

const StSwqpBtn = styled(STCOMBlueBtn)`
  width: 14.7rem;
  height: 4.5rem;
  ${({ theme }) => theme.fonts.caption};
`;
