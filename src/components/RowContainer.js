import React, { useEffect } from 'react';
import { MdShoppingBasket,MdShoppingCart,MdModeEditOutline } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import NotFound from '../img/NotFound.svg'

const RowContainer = ({flag,data,scrollValue}) => {
      const rowContainer = useRef()
      useEffect(()=>{
        rowContainer.current.scrollLeft += scrollValue;
      },[scrollValue])
  return (
    <div
    ref={rowContainer}
    className={`w-full my-12 flex items-center gap-3 bg-green-300 scroll-smooth ${flag ? 
        'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
    }`}
    >
        {
          data &&  data.length > 0 ? ( data.map(item => (
                <div key={item?.id} 
                className='w-300 min-w-[225px] md:w-340 md:min-w-[340px] h-[200px
                ] my-12
                 bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative'>
            <div className='w-full flex items-center justify-between'>
                <motion.div className='w-40 h-40 -mt-8  drop-shadow-2xl'
                  whileHover={{scale:1.2}} >
                <img 
               
                src={item?.imageURL} 
                alt='' 
                className='w-full h-full object-contain'
                />
                </motion.div>
                <motion.div 
                whileTap={{scale:0.75}} 
                className='w-10 h-10 rounded-full bg-green-700 flex items-center 
                justify-center  cursor-pointer hover:shadow-md'>
                    <MdModeEditOutline 
                    className='text-white'/>

                </motion.div>
                


            </div>
                <div className='w-full flex flex-col items-end justify-end'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                        {item?.title}

                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                        {item?.calories} Calories
                    </p>
                    <div className='flex items-center gap-8'>
                        <p className='text-lg text-headingColor font-semibold'>
                          <span className='text-lg text-red-500'>₭ </span>{item?.price}
                        </p>

                    </div>

                </div>
        </div>
            )) ):( <div className='w-full flex flex-col items-center justify-center my-5'>
                    <img src={NotFound} className="h-340"/>
                    <p className='text-xl text-textColor font-semibold my-12'>Items Not Available</p>
                 </div>
        )} 
    </div>
  )
}

export default RowContainer