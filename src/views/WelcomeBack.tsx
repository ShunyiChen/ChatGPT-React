import { useState, useRef, useEffect  } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import {getLogoIcon} from '../utils/Common'
import NewTextField, { TextFieldType } from '../components/NewTextField'


function WelcomeBack() {
    const location = useLocation();
    const data = location.state;
    const [email, setEmail] = useState(data.email)
    const [emailFormatCheck, setEmailFormatCheck] = useState(false)
    
    const handleChange = (text: string) => {
        setEmail(text)
    }

    let navigate = useNavigate()
    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate("/u/login/password", { state: { email: email} })
    }

    const signUp = () => {
        navigate("/u/signup/identifier", { state: { email: ""} })
    }
   
    return (
        <div className="d-flex flex-column align-items-center" style={{width:"100%", backgroundColor:"white", overflow:"auto", paddingTop:"32px"}}>
            <header className="d-flex flex-row align-items-center">
                <svg viewBox="140 140 520 520" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"></path>
                </svg>
            </header>
            <main className='d-flex flex-row align-items-center justify-content-center' style={{padding: "80px 80px", height:"100%"}}>
                <div className="d-flex flex-column align-items-center" style={{marginTop:"-30px"}}>
                    <header className="d-flex flex-row align-items-center" style={{padding:"40px 40px 24px"}}>
                        <div className='h1' style={{margin:"24px 0px 0px", fontSize:"32px", color:"#2D333A", fontWeight:"bold"}}>Welcome back</div>
                    </header>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <NewTextField title={'Email address'} borderColor={'#C2C8D0'} type={TextFieldType.email} withButton={false} initialValue={email} handleChange={handleChange}></NewTextField>
                            
                            
                            <div style={{margin:"24px 0px 0px"}}>
                                <button type="submit" className="btn ContinueButton" >Continue</button>
                            </div>
                        </form>
                        <div className='d-flex flex-row justify-content-center' style={{fontSize:"14px", marginTop:"16px", height:"17px"}}>
                            <p>Don't have an account?
                                <a href="" className="text-decoration-none" style={{padding:"0px 5px", color:"#10A37F"}} onClick={signUp}>Sign up</a>
                            </p>
                        </div>
                        <div className='orLine d-flex flex-row justify-content-center align-items-start' style={{paddingTop:"24px", width:"100%"}}>
                            <span>Or</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center' style={{marginTop:"24px"}}>
                            <form action="" style={{marginBottom:"8px"}}>
                                <button type="button" className="btn ContinueWithButton">
                                    <span className='px-2'>
                                        <img src={getLogoIcon('Google.svg')} alt="" />
                                    </span>
                                    <span className='px-2 text-center'>Continue with Google</span>
                                </button>
                            </form>
                            <form action="" style={{marginBottom:"8px"}}>
                                <button type="button" className="btn ContinueWithButton">
                                    <span className='px-2'>
                                        <img src={getLogoIcon('Microsoft.svg')} alt="" />
                                    </span>
                                    <span className='px-2 text-center'>Continue with Microsoft Account</span>
                                </button>
                            </form>
                            <form action="" style={{marginBottom:"8px"}}>
                                <button type="button" className="btn ContinueWithButton">
                                    <span className='px-2'>
                                        <img src={getLogoIcon('Apple.svg')} alt="" style={{width:"20px"}}/>
                                    </span>
                                    <span className='px-2 text-center'>Continue with Apple</span>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
            <footer className='d-flex flex-row justify-content-center align-items-center' style={{padding:"12px 0 24px", fontSize:"14px"}}>
                <a href="https://openai.com/policies/terms-of-use" target="_blank" className="mx-2 text-decoration-none align-items-end" rel="noreferrer" style={{color:"#10A37F", textAlign:"right", width:"auto"}}>Terms of use</a>
                <span className='link-secondary'>|</span>
                <a href="https://openai.com/policies/privacy-policy" target="_blank" className="mx-2 text-decoration-none" rel="noreferrer" style={{color:"#10A37F", width:"auto"}}>Privacy policy</a>
            </footer>
            
        </div>
    )

}

export default WelcomeBack