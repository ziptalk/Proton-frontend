import { MouseEventHandler } from 'react';
import { Button as UIButton, IconName } from '@interchain-ui/react';
import { useChain } from '@cosmos-kit/react';
import { formatAddress } from '../../common/utils/formatAddress';

export type ButtonProps = {
  text?: string;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  address?: string;
};

export type ConnectProps = Pick<ButtonProps, 'text' | 'loading' | 'onClick'>;

function noop() {}

export function Button({
  text,
  icon,
  loading,
  disabled,
  onClick = noop,
}: ButtonProps) {
  return (
    <UIButton
      onClick={onClick}
      leftIcon={icon}
      disabled={disabled}
      isLoading={loading}
      domAttributes={{
        style: {
          flex: 1,
          background: 'linear-gradient(125deg, #2f44b0ab 1%, #581a38e4 99%)',
          height: '4.6rem',
          fontSize: '1.6rem', // 글자 크기 설정
          fontWeight: 'bold', // 글자 두께 설정
          padding: '10px 20px', // 버튼 내부 패딩 설정
          borderRadius: '20px', // 버튼의 모서리를 둥글게 설정
        },
      }}
    >
      {text}
    </UIButton>
  );
}

export const ButtonConnect = ({
  text = 'Connect Wallet',
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon='walletFilled' onClick={onClick} />
);

export const ButtonConnected = ({ onClick = noop }: ConnectProps) => {
  const { address } = useChain('neutron');
  return (
    <Button
      text={formatAddress(address)}
      icon='walletFilled'
      onClick={onClick}
    />
  );
};

export const ButtonDisconnected = ({
  text = 'Connect Wallet',
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon='walletFilled' onClick={onClick} />
);

export const ButtonConnecting = ({
  text = 'Connecting ...',
  loading = true,
}: ConnectProps) => <Button text={text} loading={loading} />;

export const ButtonRejected = ({
  text = 'Reconnect',
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon='walletFilled' onClick={onClick} />
);

export const ButtonError = ({
  text = 'Change Wallet',
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon='walletFilled' onClick={onClick} />
);

export const ButtonNotExist = ({
  text = 'Install Wallet',
  onClick = noop,
}: ConnectProps) => (
  <Button text={text} icon='walletFilled' onClick={onClick} />
);
