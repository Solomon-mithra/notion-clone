import { useRoom, useSelf } from '@liveblocks/react'
import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './ui/button'
import { BlockNoteView } from '@blocknote/shadcn'
import { BlockNoteEditor } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import '@blocknote/shadcn/style.css'
import '@blocknote/core/fonts/inter.css'
import stringToColor from '@/lib/stringToColor'

type EditorProps = {
    doc: Y.Doc
    provider: any
    darkMode: boolean
}

function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info)
    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment('document-store'),
            user: {
                name: userInfo?.name ?? 'Anonymous',
                color: stringToColor(userInfo?.email || ''),
            },
        },
    })

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
                className="nim-h-screen"
                editor={editor}
                theme={darkMode ? 'dark' : 'light'}
            />
        </div>
    )
}

function Editor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const ydoc = new Y.Doc();
        const provider = new LiveblocksYjsProvider(room, ydoc);
        setDoc(ydoc);
        setProvider(provider);

        return () => {
            provider?.destroy();
            ydoc?.destroy();
        };
    }, [room]);

    const style = `hover:text-white ${
        darkMode
            ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700'
            : 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700'
    }`;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-6">
                {/* TranslateDocument AI */}

                {/* ChatToDocument AI */}

                {/* {Dark Mode} */}
                <Button
                    className={style}
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? (
                        <SunIcon className="h-4 w-4" />
                    ) : (
                        <MoonIcon className="h-4 w-4" />
                    )}
                </Button>
            </div>
            {/* BlockNote */}
            {doc && provider && (
                <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
            )}
        </div>
    )
}

export default Editor
