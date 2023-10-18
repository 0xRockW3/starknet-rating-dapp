import Image from 'next/image';
// import starIcon from '../../public/Starknet.svg'
import profile from '../../public/profile.jpg'

function Header() { 
    return (
        <header className="header">

            <div className="logo">
                <Image style={{ borderRadius: 10 }} priority src={profile} height={96} width={96} alt="Follow me on Twitter =) 0xRockW3" />

                {/* <img style={{borderRadius: 10}} src={profilePicture} alt="Follow me =)" height={96} width={96} /> */}
                {/* <Image priority src={starIcon} height={150} width={150} className="starknet" alt="Follow me on Twitter =) 0xRockW3" /> */}
                <h1 className='textLogo'>
                    <span>0xRock's</span>
                    <span>Ratings DApp</span>
                </h1>
            </div>

        </header>
    )
}


export default Header


{/* <div className="mb-10">
    <img src='/starkhub.png' alt='StarkHubTR' style={{ maxWidth: 350 }} />
</div> */}