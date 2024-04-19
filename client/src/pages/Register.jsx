import register_img from '../assets/images/Sign up.gif'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {registerUser} from "../redux/authSlice.js";
import {ErrorToast} from "../helpers/ErrorToast.jsx";
export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, success } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        avatar: null,
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleProfilePictureChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setInputs((prevState) => ({
                ...prevState,
                avatar: selectedFile
            }));
        }
    };
    const register = async (e) => {
        e.preventDefault();
        const userData = new FormData ();
        console.log(inputs.avatar)
        userData.append("name", inputs.name);
        userData.append("avatar", inputs.avatar);
        userData.append("email", inputs.email);
        userData.append("password", inputs.password);
        userData.append("confirmPassword", inputs.confirmPassword);
        try {
            await dispatch(registerUser(userData))
            if (success === true) {
                navigate('/login')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <section className="w-full h-full flex justify-center items-center px-2 py-4 md:px-0 ">
                <div
                    className="w-full h-full  flex flex-wrap items-center justify-center rounded border-2 border-slate-300 shadow-2xl md:w-[69rem] md:h-[38rem] bg-white ">
                    <div className={'w-full h-full md:w-1/2 md:h-full flex flex-col justify-center items-center overflow-hidden'}>
                        <img src={register_img} className={'w-96 h-96'} alt={'..'}/>
                        <h1 className={'text-xl mb-7 font-bold text-black text-center'}>Dont have an account</h1>
                    </div>
                    <div className="w-full h-full mb-3 md:w-1/2 md:h-full flex justify-center items-center flex-col ">
                        <h1 className={'text-xl mb-3 font-bold '}>Create an account</h1>
                        <form className={'w-full h-fit flex flex-col justify-center items-center'} onSubmit={register}>
                            <div className={'w-full px-8 mb-5 flex'}>
                            <span
                                className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}>
                                <FontAwesomeIcon icon={'fa-solid fa-user'}/>
                            </span>
                                <input
                                    type={'text'}
                                    name={'name'}
                                    id={'name'}
                                    // value={name}
                                    className={'w-full h-10 flex justify-start items-center px-1 py-2  bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold '}
                                    placeholder={'Enter your name'}
                                    // onChange={event => setName(event.target.value)}/>
                                    onChange={handleChange}/>
                            </div>
                            <div className={'w-full px-8 mb-5 flex'}>
                            <span
                                className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}>
                                <FontAwesomeIcon icon={'fa-solid fa-user'}/>
                            </span>
                                <input
                                    type={'file'}
                                    name={'avatar'}
                                    id={'avatar'}
                                    className={'w-full h-10 flex justify-center items-center px-1 py-1  bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold '}
                                    onChange={handleProfilePictureChange}/>
                            </div>
                            <div className={'w-full px-8 mb-5 flex'}>
                            <span
                                className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}>
                                <FontAwesomeIcon icon={'fa-solid fa-envelope'}/>
                            </span>
                                <input
                                    type={'email'}
                                    name={'email'}
                                    id={'email'}
                                    // value={email}
                                    className={'w-full h-10 flex justify-start items-center px-1 py-2  bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold '}
                                    placeholder={'Enter your email'}
                                    // onChange={event => setEmail(event.target.value)}/>
                                    onChange={handleChange}/>
                            </div>
                            <div className={'w-full px-8 mb-5 flex'}>
                            <span
                                className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}>
                                <FontAwesomeIcon icon={'fa-solid fa-key'}/>
                            </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name={'password'}
                                    id={'password'}
                                    // value={password}
                                    className={'w-full h-10 flex justify-start items-center px-1 py-2  bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold '}
                                    placeholder={'Password'}
                                    // onChange={event => setPassword(event.target.value)}/>
                                    onChange={handleChange}/>
                                <span
                                    className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}
                                    onClick={handleClickShowPassword}>
                                <FontAwesomeIcon icon={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}/>
                            </span>
                            </div>
                            <div className={'w-full px-8 mb-5 flex'}>
                            <span
                                className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}>
                                <FontAwesomeIcon icon={'fa-solid fa-key'}/>
                            </span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name={'confirmPassword'}
                                    // value={confirmPassword}
                                    id={'confirmPassword'}
                                    className={'w-full h-10 flex justify-start items-center px-1 py-2  bg-gray-50 border border-gray-300 text-black-900 placeholder:font-bold '}
                                    placeholder={'Confirm password'}

                                    // onChange={event => setConfirmPassword(event.target.value)}/>
                                    onChange={handleChange}/>
                                <span
                                    className={'bg-slate-200 flex justify-center items-center w-10 h-10 border border-gray-300 '}
                                    onClick={handleClickConfirmPassword}>
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}/>
                            </span>
                            </div>
                            <button
                                className={'w-[16rem] p-2 mb-5 bg-indigo-50 text-white rounded valid:bg-indigo-950'}>
                                Create account
                            </button>
                            {isLoading && <ErrorToast/>}
                            {error && <p className={'w-full h-auto text-red-700 font-bold text-center'}>{error.message}</p>}
                            <p className={'w-full h-auto flex justify-center items-center'}>
                                <span>Already have an account? </span>
                                <Link to={'/login'}
                                      className={'underline text-start p-0 font-bold text-blue-600 bg-white'}>
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
