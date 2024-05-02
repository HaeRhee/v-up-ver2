import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

type props = {
  children: React.ReactNode
  isFetchingNextPage: boolean
  isFetchingPreviousPage: boolean
  hasNextPage: boolean
  nextPage: () => void
  root?: HTMLUListElement | HTMLDivElement | null
}

const InfiniteScrollContainer = ({
  children,
  isFetchingNextPage,
  isFetchingPreviousPage,
  hasNextPage,
  nextPage,
  root,
}: props) => {
  const bottomRef = useRef<HTMLDivElement>(null) //하단에 intersection observer로 감지할 요소
  const rootTarget = root ? root : null

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    //isIntersecting : 타켓이 보이는지 여부, 타겟이 보이면 다음 페이지 데이터 조회 실행
    entry.isIntersecting && nextPage()

  //intersection observer는 타켓이 보이는지를 감지해서 onIntersect로 받은 함수를 실행한다.

  useIntersectionObserver({
    target: bottomRef, //감지할 타켓을 지정한다.
    onIntersect, //타켓이 감지되면 실행할 함수를 지정한다.
    enabled: hasNextPage, //실행여부에 관련된 boolean 값을 부여한다. //useQuery의 enabled 와 비슷함
    root: rootTarget, //루트가 될 타켓을 지정한다. 지정하지않으면 최상위 문서인 document가 기본값이고, 그 문서의 스크롤을 체크한다.
  })

  return (
    <>
      {isFetchingPreviousPage && (
        <div className='flex h-[50px] items-center justify-center'>
          <Image
            src={loading}
            height={40}
            width={40}
            alt='데이터를 가져오는 중입니다.'
          />
        </div>
      )}
      {children}
      {isFetchingNextPage && (
        <div className='flex h-[50px] items-center justify-center'>
          <Image
            src={loading}
            height={40}
            width={40}
            alt='데이터를 가져오는 중입니다.'
          />
        </div>
      )}
      {hasNextPage && <div className='h-[20px]' ref={bottomRef}></div>}
    </>
  )
}

export default InfiniteScrollContainer
