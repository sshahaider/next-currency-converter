'use client';

import { useEffect, useRef, LegacyRef } from 'react';
import {  usePathname } from 'next/navigation';

interface ClickOutsideProps {
  callback: (status: boolean) => void;
}

const useClickOutside = ({ callback }: ClickOutsideProps): LegacyRef<HTMLDivElement> => {
  const targetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        callback(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  useEffect(() => {
    callback(false);
  }, [pathname]);

  return targetRef;
};

export default useClickOutside;
