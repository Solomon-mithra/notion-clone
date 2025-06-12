'use client'

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import FollowPointer from "./FollowPointer";
function LiveCursorProvider({children}: {children: React.ReactNode}) {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const cursor = {x: Math.floor(event.pageX), y: Math.floor(event.pageY)};
        updateMyPresence({ cursor });
    }

    const handlePointerLeave = () => {
        updateMyPresence({ cursor: { x: -200, y: -200 } });
    }

    return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}>
      {others.filter((other) => other.presence.cursor !== null).map(({connectionId, presence, info}) => {
        
        return (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x || 0}
            y={presence.cursor!.y || 0}
          />
        );
      })}
      {children}
    </div>
  )
}

export default LiveCursorProvider
