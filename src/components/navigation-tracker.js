'use client';

import { useNavigationTracker } from '@/utils/use-navigation-tracker';

export function NavigationTracker() {
  const path = useNavigationTracker();
  return;
}
