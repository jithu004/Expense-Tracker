"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { useUser } from '@clerk/nextjs'
import { getBudgetList } from '../../../../actions/getBudgetList'
import BudgetItem from './BudgetItem'

function BudgetList() {
  const [budgetList,setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && fetchBudgetList();
  }, [user]);

  const fetchBudgetList = async () => {
    const result = await getBudgetList(user?.primaryEmailAddress?.emailAddress);
    setBudgetList(result);
    
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
        <CreateBudget
        refreshData={()=>{
          fetchBudgetList();
        }}
        />
        {budgetList?.length>0?budgetList.map((budget,index)=>(
          <BudgetItem budget={budget} />
        )):
        [1,2,3,4,5].map((item,index)=>(
          <div key={index} className='w-full bg-slate-200 rounded-lg h-[150] animate-pulse'>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default BudgetList
