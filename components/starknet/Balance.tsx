import React from "react";
import {
    useAccount, 
    useBalance
} from "@starknet-react/core";
 
function Balance() {
    const { address } = useAccount();
    const { data: balance, isLoading: balanceLoading } = useBalance({
        address,
        watch: true,
    }); 
    
    return (
        <>
            <pre className="text-sm font-small mb-2 mt-1 text-right">
                {balanceLoading
                    ? "Loading..."
                    : `${balance?.formatted} ${balance?.symbol}`}
            </pre>
        </>
    )
}


export default Balance;