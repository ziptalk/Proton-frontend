import { STCOMBoxWrapper } from '../../common/styles/commonStyleComs';
import styled from '@emotion/styled';
import { IcModalX } from '../../mainPage/assets/0_index';
import {
  IcDisConnect,
  IcDuplicate,
  WalletNeutronIcon,
} from '../assets/0_indes';

import { shortenWalletAddress } from '../../common/utils/shortenWalletAddress';
import { copyLink } from '../../common/utils/copyLink';
import CopyToast from '../../common/components/CopyToast';
import useToast from '../../common/hooks/useToast';
import { useRef } from 'react';
import { useChain } from '@cosmos-kit/react';
import { WalletModalProps } from 'cosmos-kit';
import { Modal } from '@interchain-ui/react';
import { fadeSlideUp } from '../../common/styles/modalAnimationStyle';

const WalletModal = ({ isOpen, setOpen, walletRepo }: WalletModalProps) => {
  const { disconnect, address } = useChain('neutron');
  const { toast, showToast } = useToast();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onCloseModal = () => {
    setOpen(false);
  };
  if (address) {
    return (
      <Modal isOpen={isOpen} onClose={onCloseModal} header={''}>
        <StWrapper ref={wrapperRef}>
          <StTop>
            <p>Account</p>
            <IcModalX onClick={onCloseModal} style={{ cursor: 'pointer' }} />
          </StTop>
          <StWalletInfo>
            <StSpaceBetween>
              <StFlexC>
                <span>Connected with Keplr</span>
                <StAddress>
                  <WalletNeutronIcon />
                  <p>{shortenWalletAddress(address)}</p>
                  <StCopyIcon>
                    <StIcDuplicate
                      onClick={() => {
                        copyLink(address);
                        showToast('copy address!');
                      }}
                    />
                    {toast && <CopyToast message={toast.message} />}
                  </StCopyIcon>
                </StAddress>
              </StFlexC>

              <StDisconnectBtn
                onClick={async () => {
                  await disconnect();
                }}
              >
                Disconnect
                <IcDisConnect />
              </StDisconnectBtn>
            </StSpaceBetween>
          </StWalletInfo>
        </StWrapper>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} header={''}>
      <StWalletModalWrapper ref={wrapperRef}>
        <StTop>
          <p>Connect Wallet</p>
          <IcModalX onClick={onCloseModal} style={{ cursor: 'pointer' }} />
        </StTop>
        <StSpaceBetween>
          {walletRepo?.wallets.map(({ walletInfo, connect }) => {
            const { prettyName, logo } = walletInfo;
            let logoSrc: string | undefined;

            if (typeof logo === 'string') {
              // logo가 문자열인 경우
              logoSrc = logo;
            } else if (logo && typeof logo === 'object') {
              // logo가 객체인 경우 major URL을 사용
              logoSrc = logo.major;
            }

            return (
              <StConnectWallet
                key={prettyName}
                onClick={() => {
                  // if (!window.keplr) {
                  //   if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                  //     connect();
                  //     return;
                  //   }
                  //   downloads && window.open(downloads[0].link);
                  //   onCloseModal();
                  //   return;
                  // }
                  connect();
                  onCloseModal();
                }}
              >
                <StWalletLogo src={logoSrc} alt='logo' />
                <p>{prettyName}</p>
              </StConnectWallet>
            );
          })}
        </StSpaceBetween>
      </StWalletModalWrapper>
    </Modal>
  );
};

export default WalletModal;

const StWrapper = styled.div`
  width: 56rem;
  height: 25.2rem;
  border-radius: 16px;
  padding: 2.4rem;
  gap: 1.4rem;
  background-color: ${({ theme }) => theme.colors.invest_background};
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > * {
    width: 100%;
  }

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    width: 35rem;
    height: fit-content;
  }
`;

const StWalletModalWrapper = styled(StWrapper)`
  width: 40rem;
  animation: ${fadeSlideUp} 300ms;
`;

const StTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.fonts.body_2};
`;

const StWalletInfo = styled(STCOMBoxWrapper)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 16px;
  justify-content: center;
  ${({ theme }) => theme.fonts.body_3};
  padding: 4.7rem 3rem;

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const StDisconnectBtn = styled.button`
  width: 17.3rem;
  height: 4.6rem;
  border-radius: 20px;
  background-color: #3f3f46;
  ${({ theme }) => theme.fonts.body_2m};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const StSpaceBetween = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const StFlexC = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
  }
`;

const StAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StIcDuplicate = styled(IcDuplicate)`
  cursor: pointer;
`;

const StCopyIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StConnectWallet = styled(StWalletInfo)`
  padding: 3rem;
  width: calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.qve_blue};
  }
  @media (${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const StWalletLogo = styled.img`
  width: 6rem;
`;
