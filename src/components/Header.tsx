'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LogOutButton from './logout/LogOutButton'
import SearchComponent from '@/components/search/SearchForm'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import commu from '@/../public/images/Property 1=message-chat-circle.svg'
import people from '@/../public/images/Property 1=user-01.svg'
import back from '@/../public/images/Property 1=chevron-left.svg'
import { OPEN_ANOTHER_SHADOW } from './login/loginCss'

const Header = () => {
  const { data: user, status } = useSession()

  //현재 위치의 path확인
  const path = usePathname()

  //로그인 여부에 따른 플레이어와 메인의 여백 체크
  const check =
    status === 'authenticated' && !['/login', '/join'].includes(path)

  //path의 위치가 마이페이지 일 경우
  if (path === '/mypage') {
    return (
      <header
        className={`flex h-[100px] w-[836px] items-center justify-between border-b-2 border-solid border-primary-black py-4 pr-[2.5rem] ${check ? 'pl-[5rem] ' : 'pl-[2.5rem]'}`}
      >
        <nav>
          <Link href='/'>
            <h1 className='pr-[64px] text-[28px]  font-bold italic text-primary-white'>
              V-UP
            </h1>
          </Link>
        </nav>
        <nav className='flex justify-between  gap-4'>
          <Link
            href='/community'
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
          >
            <Image src={commu} alt='커뮤니티 아이콘' height={24} width={24} />
          </Link>
          {!user ? (
            <Link
              href='/join'
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
            >
              <Image src={commu} alt='커뮤니티 아이콘' height={24} width={24} />
            </Link>
          ) : (
            <>
              <Link
                href='/mypage'
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
              >
                <Image
                  src={people}
                  alt='마이페이지 아이콘'
                  height={24}
                  width={24}
                />
              </Link>
              <LogOutButton />
            </>
          )}
        </nav>
      </header>
    )
  } else if (
    //path가 mypage가 아닌 다른 주소일 경우
    path === '/join' ||
    path === '/login' ||
    path === '/personal-music' ||
    path === '/new-password'
  ) {
    return (
      <header className='flex h-[120px] w-[836px] items-center justify-center border-b-2 border-solid border-primary-black px-[2.5rem] py-4'>
        <nav className='flex w-screen flex-row'>
          <Link href='/' className='pr-[300px]'>
            <Image
              src={back}
              alt='뒤로가기 아이콘'
              width={24}
              height={24}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
            />
          </Link>
          <Link href='/'>
            <h1 className='text-[28px] font-bold italic text-primary-white '>
              V-UP
            </h1>
          </Link>
        </nav>
      </header>
    )
  } else {
    // 그 외
    return (
      <header
        className={`flex h-[120px] w-[836px] items-center justify-between border-b-2 border-solid border-primary-black py-4 ${check ? 'pl-[5rem]' : 'pl-[2.5rem]'} pr-[2.5rem]`}
      >
        <nav>
          <Link href='/'>
            <p className='text-[28px]  font-bold italic text-primary-white'>
              V-UP
            </p>
          </Link>
        </nav>
        <nav className='pb-[26px] pt-[26px]'>
          <SearchComponent />
        </nav>
        <nav className='flex justify-between gap-4'>
          <Link
            href='/community'
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
          >
            <Image src={commu} alt='커뮤니티 아이콘' height={24} width={24} />
          </Link>
          {!user ? (
            <Link
              href='/login'
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
            >
              <Image
                src={people}
                alt='마이페이지 아이콘'
                height={24}
                width={24}
              />
            </Link>
          ) : (
            <>
              <Link
                href='/mypage'
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
              >
                <Image
                  src={people}
                  alt='마이페이지 아이콘'
                  height={24}
                  width={24}
                />
              </Link>
              <LogOutButton />
            </>
          )}
        </nav>
      </header>
    )
  }
}

export default Header
