'use client';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch('/api/messages/unread-count', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Unread count response status:', res.status);

        if (res.ok) {
          const data = await res.json();
          console.log('Unread count data received:', data);
          
          // Handle both response formats: {count: number} or just number
          const count = typeof data === 'number' ? data : data.count || 0;
          setUnreadCount(count);
        } else {
          console.error('Failed to fetch unread count:', res.status);
          setUnreadCount(0);
        }
      } catch (error) {
        console.error('Error fetching unread messages:', error);
        setUnreadCount(0);
      }
    };

    fetchUnreadMessages();

    // Refresh every 30 seconds
    const interval = setInterval(fetchUnreadMessages, 30000);
    
    return () => clearInterval(interval);
  }, [session, setUnreadCount]);

  return (
    unreadCount > 0 && (
      <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;