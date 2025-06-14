'use client'

import { FormEvent, useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Editor from "./Editor"

function Document({ id }: { id: string }) {
    const [input, setInputValue] = useState<string>("")
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [isUpdating, startTransition] = useTransition();

    useEffect(() => {
        if (data) {
            setInputValue(data.title);
        }
    }, [data]);

    const updateTitle = (e: FormEvent) => {
        e.preventDefault();
        
        if (input.trim()){
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                });
            });
        }
    };

    return (
        <div className="flex-1 h-full bg-white p-5">
            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
                    {/* update title */}
                    <Input value={input} onChange={(e) => setInputValue(e.target.value)} />

                    <Button disabled={isUpdating} type="submit">
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                    {/* IF */}
                    {/* isOwner && InviteUser, DeleteDocument */}
                </form>
            </div>
            <div>
                {/* Manage users */}

                {/* Avatars */}
            </div>

            {/* collaborative editor */}
            <Editor/>
        </div>
    )
}

export default Document
