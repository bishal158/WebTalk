import {FaArrowLeft, FaArrowRight, FaHome, FaLock} from "react-icons/fa";
import {useEffect, useState} from "react";
import avatar from "../assets/images/dummy-image.jpg"
import Logo from "../assets/favicon/favicon-32x32.png"
import {NavLink} from "react-router-dom";
import {VscSignIn} from "react-icons/vsc";
import {BsToggle2Off} from "react-icons/bs";
const User = {
    isLoggedIn: false,
    avatar: avatar,
    name: "Mafuj Ahmed Bishal",
    email: "abishal@gmail.com",
}
export const SideBar = () => {
    const [open, setOpen] = useState(false);
    const setMode = () => {
        document.documentElement.classList.toggle("dark");
    }
    const isOpen = () => {
        setOpen(!open)
        document.getElementById("sidebar").classList.toggle('close');
    }

    return (
        <aside id={'sidebar'} className={'bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] h-screen overflow-hidden fixed  dark:bg-black'}>
            {/*Avatar*/}
            {User.isLoggedIn ? <div className={'flex  items-center gap-2.5 font-medium py-3 mx-3 overflow-hidden'}>
                    <img
                        src={avatar}
                        alt={'...'}
                        width={40}
                        className={'rounded-full'}
                    />
                    <span className={'text-xl whitespace-pre'}>Mafuj Ahmed Bishal</span>
                </div> : <div className={'flex  items-center gap-2.5 font-medium  py-3 mx-3 overflow-hidden'}>
                    <img
                        src={Logo}
                        alt={'...'}
                        width={40}
                        className={'rounded-full'}
                    />
                    <span className={'text-xl whitespace-pre'}>Web Talk</span>
                </div>}

            {/*Menu*/}
            {User.isLoggedIn ? <div className={'flex  flex-col h-full py-4'}>
                <NavLink to={'/'}>
                    <FaHome size={25} className={'min-w-max'}/> Home
                </NavLink>
                <NavLink to={'/read-blogs'}>
                    <VscSignIn size={25} className={'min-w-max'}/> Read Blogs
                </NavLink>
                <NavLink to={'/register'}>
                    <FaLock size={25} className={'min-w-max'}/> Register
                </NavLink>
                <a>
                    <BsToggle2Off size={25} className={'min-w-max'}/>
                    Dark Mode
                </a>
            </div> : <div className={'flex  flex-col h-full py-4'}>
                <NavLink to={'/'}>
                    <FaHome size={25} className={'min-w-max'}/> Home
                </NavLink>
                <NavLink to={'/login'}>
                    <VscSignIn size={25} className={'min-w-max'}/> Login
                </NavLink>
                <NavLink to={'/register'}>
                    <FaLock size={25} className={'min-w-max'}/> Register
                </NavLink>
                <a onClick={setMode}>
                    <BsToggle2Off size={25} className={'min-w-max'}/>
                    Dark Mode
                </a>
            </div>}

            {/*Collapse Button*/}
            <div
                className={'w-fit h-fit absolute z-50 right-2 bottom-5 cursor-pointer'} onClick={isOpen}>
                {open ? <FaArrowLeft/> : <FaArrowRight/>}
            </div>
        </aside>
    )
}