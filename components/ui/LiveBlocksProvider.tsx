'use client'

import React from 'react'
import {
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
throw new Error(
    'NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not defined. Please set it in your environment variables.'
  )
}

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
        {children}
    </LiveblocksProvider>
  )
}

export default LiveBlocksProvider;