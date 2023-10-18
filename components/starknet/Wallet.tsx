import { useAccount, useConnectors, useBalance, useNetwork } from '@starknet-react/core'
import { useMemo } from 'react'
import Image from 'next/image';

import SetRating from './SetRating'
import RatingsBar from './RatingsBar'
import BraavosIcon from '../../public/braavos.svg'
import ArgnetXIcon from '../../public/argentx.svg'

function WalletConnected() {
  const { address } = useAccount()
  const { disconnect } = useConnectors()
  const { chain } = useNetwork();

  const shortenedAddress = useMemo(() => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [address])

  const { data, error, isLoading } = useBalance({
    address,
    watch: true,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-1 mt-30">
        Connected: {shortenedAddress}
      </h1>

      <p className="text-xl font-semi mb-2 mt-1">
        Chain: {chain?.name}
      </p>

      <p className="text-xl font-semi mb-2 mt-1">
        {isLoading
          ? "Loading..."
          : `Balance: ${data?.formatted} ${data?.symbol}`}
      </p>

      <button onClick={disconnect} className="bg-blue-900 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Disconnect
      </button>

      <SetRating />

      <RatingsBar />

    </div>
  )
}

function ConnectWallet() {
  const { connectors, connect } = useConnectors()

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3 mt-1">Connect a wallet</h1>

      <div className="connect_wallet">

        {connectors.map((connector) => {
          return (
            <button style={{ marginRight: 10, textTransform: 'capitalize' }} key={connector.id}
              onClick={() => connect(connector)}
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded connector_wallet">
              {connector.id == "braavos" ?
                <Image src={BraavosIcon} className="connector" alt="braavos" height={24} width={24}
                /> : ''}
              {connector.id == "argentX" ?
                <Image src={ArgnetXIcon} className="connector" alt="braavos" height={24} width={24}
                /> : ''}
              <span>
                {connector.id}
              </span>
            </button>
          )
        })}

      </div>

    </div>
  )
}

export default function WalletBar() {
  const { address } = useAccount()

  return address ? <WalletConnected /> : <ConnectWallet />
}
