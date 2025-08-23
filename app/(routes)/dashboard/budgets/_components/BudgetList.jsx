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
        <CreateBudget />
        {budgetList.map((budget,index)=>(
          <BudgetItem budget={budget} />
        ))}
      </div>
    </div>
  )
}

export default BudgetList
