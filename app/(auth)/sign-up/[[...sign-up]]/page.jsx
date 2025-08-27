import { SignUp } from '@clerk/nextjs'

export default function Page() {
  // FIX: Add the afterSignUpUrl prop
  return <SignUp afterSignUpUrl="/dashboard" />
}