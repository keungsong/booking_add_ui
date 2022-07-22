import { Header ,MainContainer, CreateItem} from './components';
import './App.css';
import {Routes,Route} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunction';
import React, { useEffect } from 'react';
import { actionType } from './context/reducer';

function App() {

   const [{foodItems},dispatch] = useStateValue();

   const fetchData = async ()=>{
    await getAllFoodItems().then((data)=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data,
      })
    })
   };
    useEffect(()=>{
      fetchData();
    },[]);
  return (
    <AnimatePresence exitBeforeEnter>
    <div className="w-screen h-auto flex flex-col bg-primary">
     <Header/>
     <main className='mt-14 md:mt-22 px-4 md:px-16 py-4 w-full'>
      <Routes>
        <Route path="/*" element={<MainContainer/>}/>
        <Route path="/createItem" element={<CreateItem/>}/>
        
      </Routes>
     </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
