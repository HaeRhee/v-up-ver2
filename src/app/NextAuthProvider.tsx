'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type Props = {
  session?: Session | null
  children?: React.ReactNode
}

export const NextAuthProvider = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
