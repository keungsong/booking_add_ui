import React, { useState } from 'react';
import Logo from '../img/logo.png';
import {MdWorkOutline,MdLogout ,MdAdd,MdOutlineNotificationsNone} from 'react-icons/md';
import UserProfile from '../img/profile.png';
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import {app} from "../firebase.config"
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const Header = () => {


     const firebaseAuth = getAuth(app);
     const provider = new GoogleAuthProvider();

     const [{user},dispatch] = useStateValue()

     const [isMenu,setIsMenu] = useState(false)
    const login = async()=>{
       if(!user){
        const {user:{refreshToken,providerData}} = await signInWithPopup(firebaseAuth,provider)
        dispatch({
            type:actionType.SET_USER,
            user:providerData[0],
        })
        localStorage.setItem("user",JSON.stringify(providerData[0]))
       }else{
        setIsMenu(!isMenu);
       }
    }

    const logout = ()=>{
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type:actionType.SET_USER,
            user:null,
        })
    }
  return (
    <header className='fixed z-50 w-screen  p-4 px-4 md:p-6 md:px-16 bg-primary'>
        {/**desktop and tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>
            <Link to="/" className='flex items-center gap-2'>
                <img src={Logo} className="w-9 object-cover" alt="logo" />
                <p className='text-headingColor text-xl font-blod'>PickToU</p>
            </Link>
            <div className='flex items-center gap-8'>
            <motion.ul 
             initial={{opacity:0,x:200}}
             animate={{opacity:1,x:0}}
             exit={{opacity:0,x:200}}
             className='flex items-center gap-8 '>
                
               
                  {user && user.email === "keebxyooj2016@gmail.com" && (
                            <Link to={"/createItem"}>
                                
                              <p className='px-4 py-2 flex items-center justify-center gap-3 cursor-pointer
                                hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor
                                 text-base hover:shadow-lg' onClick={()=>setIsMenu}>New Item<MdAdd/></p>
                            </Link>
                         )}
                
            </motion.ul>
            <div className='relative flex items-center justify-center'>
                <MdOutlineNotificationsNone className='text-textColor text-2xl ml-8 cursor-pointer' />
                <div className='absolute -top-3 -right-3 w-6 h-6 rounded-full bg-carNumBg flex items-center justify-center'>
                    <p className='text-xs text-white font-semibold'>2</p>

                </div>

            </div>
             
             <div className='relative'>
              <motion.img 
               whileTap={{scale:0.6}}
               src={user ? user.photoURL : UserProfile} className="w-10 min-w-10-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" 
               alt="userprofile" 
               onClick={login}/>
               {
                isMenu && (
                <motion.div 
                       initial={{opacity:0, scale:0.6}} 
                       animate={{opacity:1, scale:1}}
                       exit={{opacity:0, scale:0.6}}
                       className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2'>
                   
                          <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all 
                          duration-100 ease-in-out text-textColor text-base'
                          onClick={logout}
                          >Logout <MdLogout/></p>

                </motion.div>
                )
               }
              </div>
            </div>
            
        </div>

        {/**mobile */}

        <div className='flex items-center justify-between md:hidden w-full h-full '>
           
            <div className='relative flex items-center justify-center'>
                <MdWorkOutline className='text-textColor text-2xl  cursor-pointer' />
                <div className='absolute -top-3 -right-3 w-6 h-6 rounded-full bg-carNumBg flex items-center justify-center'>
                    <p className='text-xs text-white font-semibold'>2</p>
                </div>
            </div>
            <Link to="/" className='flex items-center gap-2'>
                <img src={Logo} className="w-9 object-cover" alt="logo" />
                <p className='text-headingColor text-xl font-blod'>PickToU</p>
            </Link>
            <div className='relative'>
              <motion.img 
               whileTap={{scale:0.6}}
               src={user ? user.photoURL : UserProfile} className="w-10 min-w-10-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" 
               alt="userprofile" 
               onClick={login}/>
               {
                isMenu && (
                    <motion.div 
                       initial={{opacity:0, scale:0.6}} 
                       animate={{opacity:1, scale:1}}
                       exit={{opacity:0, scale:0.6}}
                       className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 '>
                         {user && user.email === "keebxyooj2016@gmail.com" && (
                            <Link to={"/createItem"}>
                                
                              <p className='px-3 py-2 flex items-center justify-center gap-3 cursor-pointer
                                hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base
                                '
                                onClick={()=>setIsMenu(false)}
                                >New Item<MdAdd/></p>
                                
                            </Link>
                            
                         )
                         }
                      
                       <ul 
                         className='flex flex-col '>
                            
                       
                          
                        
                       </ul>
                           
                          <p className='m-2 p-2 rounded-md shadow-md px-2 py-2 flex items-center justify-center bg-gray-200  gap-3 cursor-pointer
                                       hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base '
                                       onClick={logout}>
                            Logout <MdLogout/></p>

                    </motion.div>
                )
               }
            </div>
        </div>
    </header>
  )
}

export default Header