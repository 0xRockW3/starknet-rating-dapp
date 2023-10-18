import { useEffect, useState } from 'react'


import { useContractRead } from '@starknet-react/core'
import { uint256 } from "starknet";

import { erc20ABI } from '../../lib/erc20'
import { CONTRACT_ADDRESS } from '../../config.json'


function GetRatings() {
    // smart contract read 
    const { data: starknetHubTrRatings, isLoading, isError, isSuccess } = useContractRead({
        abi: erc20ABI,
        address: CONTRACT_ADDRESS,
        functionName: "get_ratings",
        args: [],
        watch: true
    });

    // usually in my code i'd prefer to use redux for memory management.
    // but for this workshop i'm gonna use simplest state solution.
    const [ratingsData, setRatingsData] = useState([])
    const [seeMore, setSeeMore] = useState(false)
    const [numberofReviews, setNumberofReviews] = useState(0)
    const [resultPoint, setResultPoint] = useState(0)

    // Do the math
    useEffect(() => {
        if (!isLoading && starknetHubTrRatings != null && isSuccess) {
            let _ratings: any = [];
            let _numberOfReviews = 0;
            let _totalEvaluationScore = 0;

            starknetHubTrRatings.map((rating, index) => {
                const { low } = uint256.bnToUint256(rating)
                if (low) {
                    const value = parseInt(low.toString());
                    _ratings.push(value)
                    if (value > 0) {
                        _numberOfReviews += value;
                        _totalEvaluationScore += (index + 1) * value
                    }
                }
            });

            console.log(_numberOfReviews);
            setRatingsData(_ratings);
            setNumberofReviews(_numberOfReviews);

            let _resultPoint = (_totalEvaluationScore / _numberOfReviews);
            if (_resultPoint > 5) _resultPoint = 5;
            else if (_resultPoint < 1) _resultPoint = 1

            setResultPoint(_resultPoint);
        }
    }, [isError, isSuccess, isLoading, starknetHubTrRatings])

    return (
        <div>
            <p className="text-xl font-semi mb-2 mt-1">
                {isLoading ? "Loading..." : ""}
            </p>

            <p className="ml-1 mt-5 mb-10">
                Ratings <b>{resultPoint.toFixed(2)}</b> out of <b>5</b><br /> 
                <a onClick={() => { setSeeMore(!seeMore); }} style={{fontWeight:'normal'}}> See more </a>
            </p>

            {seeMore == true ?
                <div className="ratings_list">
                     Number of Ratings: {numberofReviews} <br />
                    {ratingsData.map((x, y) => {
                        return <p key={y}>Star {y + 1}: {x}</p>
                    })
                    }
                </div>
                : ''}
        </div>
    )
}

export default GetRatings