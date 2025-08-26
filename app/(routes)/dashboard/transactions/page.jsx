"use client"
import React, { useRef } from 'react'
import CreateTransaction from "./_components/CreateTransaction"
import TransactionList from "./_components/TransactionsList"
import { useUser } from '@clerk/nextjs'

function Transactions() {
  const { user } = useUser();
  const listRef = useRef(null);

  return (
    <div className='p-5'> 
      <TransactionList ref={listRef} userId={user?.primaryEmailAddress?.emailAddress} />

      {/* <div className='fixed mt-3 mb-3 bottom-0 right-0'>
        <CreateTransaction 
          onTransactionCreated={() => {
            if (listRef.current) listRef.current.fetchData();
          }} 
        /> 
      </div> */}
    </div>
  )
}

export default Transactions
