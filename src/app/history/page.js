'use client'
import MainDashboard from '@/components/MainDashboard'
import Sidebar from '@/components/Sidebar'
import TableHistory from '@/components/TableHistory'
import Image from 'next/image'
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebaseConfig';

export default function page() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
  const [datas, setDatas] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const datasRef = ref(database, 'data');

    // Subscribe to real-time updates
    const unsubscribe = onValue(datasRef, (snapshot) => {
      if (snapshot.exists()) {
        const datasArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setDatas(datasArray);
      } else {
        console.log('No data available');
      }
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);
  return (
    <main className='min-h-screen max-w-screen w-full bg-white pl-[140px] pr-[40px] py-5'>
      <Sidebar />
      <TableHistory datas={datas}/>
    </main>
  )
}
