
'use client'

import { SignInButton, SignOutButton, useUser, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
    const { user } = useUser();
    return (
    <div className="flex justify-between items-center p-5">
        {user && (
            <h1 className="text-2xl">{user?.firstName}{"'s"} Space</h1>       
        )}

        {"breadcrumbs"}
        <Breadcrumbs/>

        <div>
            <SignedOut>
              <SignInButton />
              <SignOutButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}
