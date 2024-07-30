import { usePathname } from 'next/navigation';
import { insertAnalytics } from '@/services/analytics';
import { useEffect } from 'react';

export function useNavigationTracker() {
  const currentPathName = usePathname();

  useEffect(() => {
    if (localStorage.getItem('visited_pages') === null) {
      localStorage.setItem('visited_pages', JSON.stringify([]));
    }

    let visitedPages = JSON.parse(localStorage.getItem('visited_pages'));

    const lastPathName = visitedPages[visitedPages.length - 1];
    if (lastPathName !== currentPathName) {
      visitedPages.push(currentPathName);
    }

    localStorage.setItem('visited_pages', JSON.stringify(visitedPages));
  }, [currentPathName]);
}

export async function submitAndResetNavigationTracker() {
  const visitedPages = JSON.parse(localStorage.getItem('visited_pages'));

  if (visitedPages === null) {
    return;
  }

  insertAnalytics({ visitedUrl: visitedPages })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      localStorage.removeItem('visited_pages');
    });

  /*
   * Clear dan submit navigation-tracker ketika
   * - user telah memberikan feedback atau
   * - tidak ada interaksi dari user (idle)
   */
}
