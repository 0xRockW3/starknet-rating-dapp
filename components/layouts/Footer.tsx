import { useBlock } from '@starknet-react/core'


function Ahref(url: string, text: string) {
    return (
        <a rel="noreferrer" target="_blank" href={`${url}`} className="color-blue"> {text} </a>
    )
}

function Footer() {
    const { data, isLoading, isError } = useBlock({
        refetchInterval: 3000,
        blockIdentifier: 'latest',
    })

    const profileName = "0xRockW3"
    const profileLink = `https://x.com/${profileName}`
    const githubLink = "https://github.com/0xRockW3"
    
    return (


        <>
            <div style={{ marginTop: 0, marginBottom: 50 }}>
                <div className="text-sm">
                    {isLoading ? 'Loading...' : isError
                        ? 'Error while fetching the latest block hash'
                        : `Latest block hash: ${data?.block_hash}`}
                </div>
                <div className="text-sm m-1">
                    made with <span style={{ color: '#fff' }}> 🖤 </span>
                    by {Ahref(profileLink, profileName)}
                    view on {Ahref(githubLink, "Github")}
                </div>
            </div>
            {/* <div className="profileBar">
                <a href={profileLink} className="profile" rel="noreferrer" target="_blank">
                    <img src={profilePicture} alt={profileName} height={64} width={64} />
                    <span>{profileName}</span>
                </a>
            </div> */}
        </>


    )

}

export default Footer