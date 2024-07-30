'use client';

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export function VideoPlayer(props) {
  return <ReactPlayer {...props} />;
}
