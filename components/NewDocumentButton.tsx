"use client";

import React from 'react'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/actions';

function NewDocumentButton() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      // Logic to create a new document
      console.log('New document created')

      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  }
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? 'Creating...' : 'New Document'}
    </Button>
  )
}

export default NewDocumentButton