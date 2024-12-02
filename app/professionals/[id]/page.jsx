'use client';

import ProCard from '@/components/ProCard';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPro } from '@/utils/request';
import Spinner from '@/components/Spinner';

const ProPage = () => {
  const { id } = useParams();

  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProData = async () => {
      if (!id) return;
      try {
        const pro = await fetchPro(id);
        setPro(pro);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pro === null) {
      fetchProData();
    }
  }, [id, pro]);

  if (!pro && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>Pro Not Found</h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && pro && (
        <>
          <Procard pro={pro} />
        </>
      )}
    </>
  );
};

export default ProPage;
