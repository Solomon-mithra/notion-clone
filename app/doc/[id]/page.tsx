"use client"
import Document from "@/components/Document"; // Adjust the import path as needed

function DocumentPage(params: { params: { id: string } }) {
  const { id } = params.params;
  return (
    <div className="flex flex-col flex-1 min-h-screen">
        <Document id={id} />
    </div>
  )
}

export default DocumentPage