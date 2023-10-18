import React, { useEffect, useMemo, useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import Image from 'next/image';

import {
    useAccount,
    useContract,
    useContractWrite,
    useWaitForTransaction,
} from "@starknet-react/core";

import Balance from './Balance'
import { erc20ABI } from '../../lib/erc20'
import { CONTRACT_ADDRESS } from '../../config.json'

import StarEmpty from '../../public/star_empty.svg'
import StarFilled from '../../public/star_rating.svg'

function SetRating() {
    const { address } = useAccount();
    const { contract } = useContract({
        abi: erc20ABI,
        address: CONTRACT_ADDRESS,
    });

    const [value, setValue] = useState(5);

    // smart contract write 
    const calls = useMemo(() => {
        if (!address || !contract) return [];

        // name of function and arguments
        return contract.populateTransaction["set_rating"]!(value);
    }, [contract, address, value]);

    const {
        write,
        reset,
        data: tx,
        isLoading: isSubmitting,
        isError: isSubmitError,
        error: submitError,
    } = useContractWrite({
        calls,
    });

    const action = () => receipt ? reset() : write();

    const {
        data: receipt,
        isLoading,
        isError,
        error,
    } = useWaitForTransaction({
        hash: tx?.transaction_hash,
        watch: true,
        retry: true,
        refetchInterval: 2000,
    });

    const buttonContent = useMemo(() => {
        if (isSubmitting) {
            return (
                <>
                    <CircleLoader color="navy" />
                </>
            );
        }
        // if (isLoading) {
        //     return (
        //         <>
        //             Waiting for confirmation
        //         </>
        //     );
        // }
        if (receipt && receipt.status === "REJECTED") {
            return (
                <>
                    Transaction rejected
                </>
            );
        }
        if (receipt) {
            return (
                <>
                    Transaction confirmed
                </>
            );
        }
        return (
            <>
                Send Transaction
            </>
        );
    }, [isSubmitting, isLoading, receipt]);


    const [status, setStatus] = useState(null)
    useEffect(() => {
        if (receipt) {
            const { finality_status } = receipt
            setStatus(finality_status);

        }
    }, [receipt]);

    function getStarIcon(x: any) {
        return
    }

    return (
        <>
            <div className="rating-card">
                <h3 className="text-md font-semibold mb-1 mt-5">
                    Do you like StarkHubTR?
                </h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map(x => (
                        <button key={x} style={{ marginRight: 5 }} onClick={() => { setValue(x) }} className="">
                            {x <= value ? <Image src={StarFilled} className="star_fill" alt="star_fill" height={24} width={24} /> :
                                <Image src={StarEmpty} className="star_empty" alt="star_empty" height={24} width={24} />}
                        </button>
                    ))}
                </div>

                {/* <Balance /> */}

            </div>


            <div className="ratingButtons">
                <button disabled={!address || isSubmitting} onClick={() => { action(); }} className={isSubmitting === true ?
                    "text-white font-bold py-2 px-4 rounded" :
                    "bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                    {buttonContent}
                </button>
            </div>

            <div className="trasactionResult">
                {status !== null && !status.transaction_hash ?
                    <p className="text-xl font-semi mb-2 mt-1 tx_status">{status}</p> : ''}

                {receipt && receipt.transaction_hash ?
                    <a href={`https://testnet.starkscan.co/tx/${receipt.transaction_hash}`} rel="noreferrer" target="_blank">
                        See on Starkscan </a> : ''
                }
            </div>

            <div className="errorFields">
                {isSubmitError ? <p className="text-xl font-semi mb-2 mt-1">{isSubmitError?.message}</p> : ''}
                {submitError ? <p className="text-xl font-semi mb-2 mt-1">{submitError?.message}</p> : ''}
                {error ? <p className="text-xl font-semi mb-2 mt-1">{error?.message}</p> : ''}
            </div>
        </>
    )
}


export default SetRating;