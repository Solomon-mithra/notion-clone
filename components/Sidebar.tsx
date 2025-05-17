'use client'

import { Menu } from 'lucide-react'
import NewDocumentButton from './NewDocumentButton'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { use, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

interface Roomdocument extends DocumentData {
    createdAt: Date
    roomId: string
    role: 'owner' | 'editor'
    UserId: string
}

function Sidebar() {
    const { user } = useUser()
    const [groupedData, setGroupedData] = useState<{
        owner: Roomdocument[]
        editor: Roomdocument[]
    }>({
        owner: [],
        editor: [],
    })
    console.log(
        'DEBUG: user.emailAddresses[0]',
        user?.emailAddresses[0].emailAddress
    )
    const [data, loading, error] = useCollection(
        user &&
            query(
                collectionGroup(db, 'rooms'),
                where('UserId', '==', user?.emailAddresses[0].emailAddress)
            )
    )
    console.log('DEBUG: data', data)
    console.log(
        'DEBUG: docs',
        data?.docs?.map((doc) => doc.data())
    )
    useEffect(() => {
        if (!data) return

        const grouped = data.docs.reduce<{
            owner: Roomdocument[]
            editor: Roomdocument[]
        }>(
            (acc, curr) => {
                const roomData = curr.data() as Roomdocument
                if (roomData.role === 'owner') {
                    acc.owner.push({ id: curr.id, ...roomData })
                } else if (roomData.role === 'editor') {
                    acc.editor.push({ id: curr.id, ...roomData })
                }
                return acc
            },
            { owner: [], editor: [] }
        )

        setGroupedData(grouped)
    }, [data])

    const menuOptions = (
        <>
            <NewDocumentButton />

            <div className='flex py-4 flex-col spae-y-4 md:max-w-36'>
            {/* My documents */}
            {groupedData.owner.length === 0 ? (
                <div className="text-gray-500 px-2 py-1">
                                        <h2 className='text-gray-500 font-semibold text-sm'> No documents found</h2>

                </div>
            ) : (
                <>
                <h2 className='text-gray-500 font-semibold text-sm'> My Documents</h2>
                    {data?.docs?.map((doc) => (
                        <p className='py-1' key={doc.id}>{doc.data().roomId}</p>
                    ))}
                </>
            )}
            </div>

            {/* Shared with me */}
            {groupedData.editor.length === 0 ? (
                <div className="text-gray-500 py-1">
                    <h2 className='text-gray-500 font-semibold text-sm'> No documents found</h2>
                </div>
            ) : (
                <>
                    <h2 className='text-gray-500 font-semibold text-sm'> Shared Documents</h2>
                    {data?.docs?.map((doc) => (
                        <p key={doc.id}>{doc.data().roomId}</p>
                    ))}
                </>
            )}
        </>
    )

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Menu
                            className="p-2 hover:opacity-30 rounded-lg cursor-pointer"
                            size={40}
                        />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOptions}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:inline">{menuOptions}</div>
        </div>
    )
}

export default Sidebar
