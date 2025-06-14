
import { useRoom } from "@liveblocks/react";
import { useState } from "react";
import * as Y from "yjs";

function Editor() {

    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();

  return (
    <div className="max-w-6xl mx-auto">
        <div>
            {/* TranslateDocument AI */}

            {/* ChatToDocument AI */}

            {/* {Dark Mode} */}
        </div>
        {/* BlockNote */}
    </div>
    )
}

export default Editor

function usesState<T>(): [any, any] {
    throw new Error("Function not implemented.");
}
