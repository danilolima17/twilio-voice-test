import { CallForm } from "@/components/call-form"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-md w-full space-y-6">
     

        <CallForm />
      </div>

      <Toaster />
    </main>
  )
}

