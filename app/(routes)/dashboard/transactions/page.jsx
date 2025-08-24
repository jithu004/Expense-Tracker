"use client"
import React from 'react'
import CreateTransaction from "./_components/CreateTransaction"
import TransactionList from "./_components/TransactionsList"
import { useUser } from '@clerk/nextjs'
function Transcations() {
  const {user} = useUser();
  return (
    <div className='p-5'> 
      <TransactionList userId={user?.primaryEmailAddress?.emailAddress} />
      <div className='fixed mt-3 mb-3 bottom-0 right-0'>
        <CreateTransaction /> 
      </div>
    </div>
  )
}

export default Transcations