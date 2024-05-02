import arrow from '@/../public/images/chevron-down.svg'
import { queryClient } from '@/app/provider'
import { GET_MUSIC_LIST_QUERY_KEYS } from '@/query/musicPlayer/musicPlayerQueryKeys'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import {
  getUserMyPlaylistDataInfinite,
  updateMyMusicIds,
} from '@/shared/mypage/api'
import type { UserInfo } from '@/types/mypage/types'
import InfiniteScrollContainer from '@/util/InfiniteScrollContainer'
import { dragHandler } from '@/util/util'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { throttle } from 'lodash'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import ButtonPrimary from '../../util/ButtonPrimary'
import CheckboxItem from './CheckboxItem'

const MyPlaylist = ({ data }: { data: UserInfo }) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [toggle, setToggle] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const [scrollBoxTopPosition, setScrollBoxTopPosition] = useState(0)

  const PER_PAGE = 5 //한 번에 불러올 데이터 수
  const MAX_PAGES = 4 //유지할 페이지 수

  //**** 무한 스크롤 기본 로직 ****
  //역방향 : onScroll 이벤트 핸들러를 통해 일정 스크롤 사이즈에 도달할 경우 이전 페이지의 데이터를 불러오는 로직 실행
  //정방향 : intersection observer 를 통해 타켓이 보일 경우 다음 페이지 데이터를 불러오는 로직 실행

  const {
    data: playlistMyData,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_INFO, uid],
    queryFn: ({ pageParam = 1 }) =>
      getUserMyPlaylistDataInfinite(uid, pageParam, PER_PAGE),
    select: (data) => ({
      pages: data.pages.map((data) => data?.myPlaylistData),
      pageParams: data.pageParams,
      playlistMyIds: data.pages[0]?.playlistMyIds,
    }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage || lastPage.isLast) {
        return null
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
    initialPageParam: 1,
    maxPages: MAX_PAGES,
    enabled: !!uid,
  })

  const playlistMyIds = playlistMyData?.playlistMyIds

  //현플리 데이터 조회
  const { data: playlistCurrentData } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
    enabled: !!uid,
  })

  const updateMyPlayListMutation = useMutation({
    mutationFn: updateMyMusicIds,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_INFO],
      })
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_MUSIC_LIST],
      })
    },
  })

  const updateCurrentPlayListMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
      })
      queryClient.invalidateQueries({
        queryKey: [GET_MUSIC_LIST_QUERY_KEYS.CURRENT_MUSIC_INFO],
      })
    },
  })

  //체크박스 check 상태 변경 핸들러
  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  //선택한 노래 담는 useState 초기화 함수
  const checkListReset = () => {
    setCheckedList([])
  }

  //삭제
  const onClickDeleteHandler = async () => {
    if (checkedList.length === 0) {
      await Swal.fire({
        icon: 'warning',
        title: '삭제할 노래를 선택해주세요!',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }

    //현재 마이플레이리스트에 있는 곡
    const myMusicIds = playlistMyIds as string[]

    //추가할 데이터 필터링(마플리에 없는 노래 찾기)
    const newData = myMusicIds.filter((el) => !checkedList.includes(el))

    try {
      await updateMyPlayListMutation.mutateAsync({
        userId: uid,
        myMusicIds: newData,
      })
      await Swal.fire({
        icon: 'success',
        title: '삭제가 완료 되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      checkListReset() //데이터 추가 후 체크리스트 비우기
    } catch (error) {
      console.error(error)
    }
  }

  //현플리에 노래 추가
  const onClickAddHandler = async () => {
    if (checkedList.length === 0) {
      await Swal.fire({
        icon: 'warning',
        title: '추가할 노래를 선택해주세요',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }

    //현플리에 있는 노래 담은 변수
    const playListCurrentIds = !playlistCurrentData?.[0].currentMusicIds
      ? []
      : playlistCurrentData?.[0]?.currentMusicIds
    let newData = []

    //현플리에 노래가 있을 경우
    if ((playListCurrentIds?.length as number) > 0) {
      //선택한 노래 중 현플리에 없는 노래 찾아서 addData에 담기
      const addData = checkedList.filter(
        (el) => !playListCurrentIds.includes(el),
      )

      //이미 다 추가되어 있다면
      if (addData.length === 0) {
        await Swal.fire({
          icon: 'warning',
          title: `선택하신 ${checkedList.length}개의 곡 모두 이미 추가되어 있습니다.`,
          showConfirmButton: false,
          timer: 1500,
          background: '#2B2B2B',
          color: '#ffffff',
        })
        return
      }

      newData = [...playListCurrentIds, ...addData]
    } else {
      //현플리에 노래가 없다면 체크한 노래 그대로 넣기
      newData = [...checkedList]
    }

    try {
      updateCurrentPlayListMutation.mutateAsync({
        userId: uid,
        currentList: newData,
      })
      await Swal.fire({
        icon: 'success',
        title: '현재 재생목록에 추가 되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      checkListReset()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  //전체 담기
  const onClickAllAddHandler = async () => {
    //현플리 노래 id들 담은 변수
    const playListCurrentIds = !playlistCurrentData?.[0]?.currentMusicIds
      ? []
      : playlistCurrentData?.[0].currentMusicIds
    const playListMyIds = !playlistMyIds ? [] : playlistMyIds
    let newData = []

    //마이플에 노래가 없다면 추가할 노래가 없기 때문에.
    if (playListMyIds?.length === 0) {
      await Swal.fire({
        icon: 'info',
        title: '추가할 곡이 없습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }

    if ((playListCurrentIds?.length as number) > 0) {
      const addData = playListMyIds.filter(
        (el) => !playListCurrentIds.includes(el),
      )

      if (addData.length === 0) {
        await Swal.fire({
          icon: 'info',
          title: `선택하신 ${playListMyIds.length}개 모두 이미 추가되어 있습니다.`,
          showConfirmButton: false,
          timer: 1500,
          background: '#2B2B2B',
          color: '#ffffff',
        })
        return
      }

      newData = [...playListCurrentIds, ...addData]
    } else {
      newData = [...playListMyIds]
    }

    try {
      updateCurrentPlayListMutation.mutateAsync({
        userId: uid,
        currentList: newData,
      })
      checkListReset()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  //마플리 접기 기능.
  const onClickToggleHandler = () => {
    //토글 상태 반전
    setToggle((prev) => !prev)
    //선택한 노래가 있을 수 있기 때문에 리셋
    checkListReset()
  }

  //리렌더링 되면 지연해놓은게 감지가 되지 않기 때문에 useCallback으로 감싸고,
  //쓰로틀링을 걸어서 스크롤 이벤트가 계속 발생하지 않게함.
  //현재는 1초 간격으로 실행됨.
  const handleScroll = useCallback(
    throttle(() => {
      const height = listRef.current?.children[0]
        ? listRef.current?.children[0].clientHeight
        : 0
      if (scrollBoxRef.current) {
        if (
          //hasPreviousPage : 이전 페이지 유무, isFetchingPreviousPage : 불러오는 중인지 여부,
          hasPreviousPage &&
          !isFetchingPreviousPage &&
          scrollBoxRef.current.scrollTop < height * 4 //스크롤 사이즈가 아이템 요소 4개의 높이보다 작으면 실행
        ) {
          //이전 페이지 데이터 불러오는 함수
          fetchPreviousPage()
        }
      }
    }, 1000),
    [fetchPreviousPage, hasPreviousPage],
  )

  //다음 페이지 데이터 불러오는 함수
  const nextPage = () => {
    //isFetchingNextPage : 다음페이지 불러오는 중인지 여부, hasNextPage : 다음 페이지 유무
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    if (scrollBoxRef.current) {
      //scrollBoxRef.current : 스크롤할 영역의 타켓
      //타켓의 상단 좌료를 구해서 useState에 담는다
      //스크롤할 영역의 높이를 해상도에 따라 가변적으로 구하기 위해서 이 좌표를 useState에 담음
      setScrollBoxTopPosition(scrollBoxRef.current?.getBoundingClientRect().top)
    }
  }, [scrollBoxTopPosition])

  useEffect(() => {
    if (scrollBoxRef.current) {
      //쓰로틀링 적용된 이벤트 핸들러 추가
      scrollBoxRef.current.addEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const shadow =
    'shadow-[-4px_-4px_8px_rgba(255,255,255,0.05),4px_4px_8px_rgba(0,0,0,0.7)]'

  const toggleStyle = 'h-0 opacity-0'

  return (
    <div className='mt-[5rem]'>
      <div className='flex items-center justify-between'>
        <h2
          className='flex cursor-pointer items-center gap-2 text-[1.25rem] font-bold'
          onClick={onClickToggleHandler}
        >
          {data?.nickname}님의 플레이리스트
          <Image
            src={arrow}
            height={24}
            width={24}
            className={`${toggle ? '' : 'rotate-180'}`}
            alt='화살표 아이콘'
          />
        </h2>
        <ButtonPrimary onClick={onClickAllAddHandler}>
          전체 곡 담기
        </ButtonPrimary>
      </div>
      {checkedList.length > 0 && (
        <div
          className={`fixed bottom-10 flex min-w-[232px] items-center rounded-2xl border-2 border-[rgba(0,0,0,0.05)] ${shadow} overflow-hidden bg-[#ffffff19] backdrop-blur-sm`}
          style={{ left: 'calc(50% + (388px / 2) - 56px)' }}
        >
          <button
            type='button'
            onClick={onClickDeleteHandler}
            className='w-1/2 p-4'
          >
            삭제
          </button>
          <button
            type='button'
            onClick={onClickAddHandler}
            className='w-1/2 border-l border-l-[rgba(255,255,255,0.5)] p-4'
          >
            {checkedList.length}곡 담기
          </button>
        </div>
      )}
      <div
        ref={scrollBoxRef}
        className='overflow-y-auto'
        style={{
          height: `calc(100vh - ${scrollBoxTopPosition}px - 30px)`, //100vh에서 타켓의 top좌표를 구한 값으로 빼서 높이를 동적으로 구함.
        }}
      >
        <InfiniteScrollContainer
          isFetchingNextPage={isFetchingNextPage}
          isFetchingPreviousPage={isFetchingPreviousPage}
          hasNextPage={hasNextPage}
          nextPage={nextPage}
          root={scrollBoxRef.current}
        >
          <ul
            className={`tracking-[-0.03em] ${toggle ? toggleStyle : ''} overflow-hidden transition-opacity ease-in-out`}
            ref={listRef}
          >
            {playlistMyData && playlistMyData.playlistMyIds?.length! > 0 ? (
              <>
                {playlistMyData.pages.map((group, i) => (
                  <React.Fragment key={playlistMyData.pageParams[i]}>
                    {group?.map((item) => (
                      <li
                        draggable='true'
                        onDragStart={(e) => {
                          dragHandler(e, item)
                        }}
                        key={item.musicId}
                        className='flex items-center justify-between p-4'
                      >
                        <div className='flex items-center'>
                          <CheckboxItem
                            checked={checkedList.includes(item.musicId)}
                            id={`my-${item.musicId}`}
                            onChangeCheckMusicHandler={(e) =>
                              onChangeCheckMusicHandler(
                                e.target.checked,
                                item.musicId,
                              )
                            }
                          />
                          <figure className='ml-7 mr-4 overflow-hidden rounded-full'>
                            <Image
                              src={item.thumbnail}
                              width={56}
                              height={56}
                              alt={`${item.musicTitle} 앨범 이미지`}
                            />
                          </figure>
                          <label
                            htmlFor={`my-${item.musicId}`}
                            className='flex cursor-pointer flex-col'
                          >
                            <span className='text-[1.125rem]'>
                              {item.musicTitle}
                            </span>
                            <span className='text-[0.875rem] text-[#ffffff7f]'>
                              {item.artist}
                            </span>
                          </label>
                        </div>
                        <span className='text-[0.875rem] font-medium text-[#ffffff7f]'>
                          {item.runTime}
                        </span>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <li className='flex h-[300px] items-center justify-center text-[1rem] text-white/50'>
                좋아하는 음악을 추가해보세요!
              </li>
            )}
          </ul>
        </InfiniteScrollContainer>
      </div>
    </div>
  )
}

export default MyPlaylist
