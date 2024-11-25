'use client'

import ProcessedImages from './images'; // Adjust the path if necessary
import Graph from './graph';
import Edit from './edit';

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ByUser() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user');
  if (!user) {
    return <h3>Error: No user provided in the URL</h3>;
  }
  return(
    <div>
    <Edit username={user}/>
    <Graph username={user}/>
    <ProcessedImages username={user}/>
    </div>
  )     
}

export default function page() {
  return(
      <Suspense>
      <ByUser/>
      </Suspense>
  )
}