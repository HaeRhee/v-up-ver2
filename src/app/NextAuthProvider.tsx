'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type Props = {
  session?: Session | null
  children?: React.ReactNode
}

export const NextAuthProvider = ({ session, children }: Props) => {
  // 받은 session을 SessionProvider에 전달
  // 해당 세션 정보를 하위 컴포넌트에 전달
  return <SessionProvider session={session}>{children}</SessionProvider>
}
