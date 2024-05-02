'use client'

import { GET_MUSIC_LIST_QUERY_KEYS } from '@/query/musicPlayer/musicPlayerQueryKeys'
import { GET_USER_INFO } from '@/query/user/userQueryKeys'
import { getCurrentMusicData, updateCurrentMusic } from '@/shared/main/api'
import { getMyWriteListData } from '@/shared/mypage/api'
import { usePaginationStore } from '@/shared/store/paginationStore'
import type { Board } from '@/types/mypage/types'
import Pagination from '@/util/Pagination '
import { paging, resetPagination } from '@/util/util'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import BoardItem from './BoardItem'
import BoardNoData from './BoardNoData'
import { useEffect } from 'react'

const WriteList = () => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const setCurrentPageData = usePaginationStore(
    (state) => state.setCurrentPageData,
  )
  const { currentPageData } = usePaginationStore()
  const { currentPage } = currentPageData

  useEffect(() => {
    resetPagination(setCurrentPageData)
  }, [])

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getMyWriteListData(uid),
    queryKey: [GET_USER_INFO.MY_WRITE_BOARD_LIST],
    enabled: !!uid,
  })

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    data,
    currentPage,
    setCurrentPageData,
    5,
  )

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(uid),
    queryKey: [GET_MUSIC_LIST_QUERY_KEYS.MY_CURRENT_MUSIC_LIST],
    enabled: !!uid,
  })

  const updateMutation = useMutation({
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

  //현플리에 노래 추가하는 함수
  const onClickAddCurrentMusicHandler = async (musicId: string) => {
    const currentList = playListCurrent?.length
      ? playListCurrent[0].currentMusicIds
      : []
    //현플리에 추가하려는 노래가 이미 있을 경우
    if (currentList.find((el) => el === musicId)) {
      await Swal.fire({
        icon: 'warning',
        title: '이미 추가된 노래입니다.',
        confirmButtonText: '확인',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }
    currentList.push(musicId)
    updateMutation.mutate({ userId: uid, currentList })
  }

  if (isError) {
    return '에러가 발생했어요!'
  }

  if (isLoading) {
    return '데이터를 불러오는 중입니다.'
  }

  return (
    <section>
      <ul className='mb-8'>
        {currentItems && currentItems?.length > 0 ? (
          (currentItems as Board[])?.map((item) => {
            return (
              <BoardItem
                key={item.boardId}
                data={item}
                onClick={() => onClickAddCurrentMusicHandler(item.musicId)}
              />
            )
          })
        ) : (
          <BoardNoData />
        )}
      </ul>
      {currentItems && currentItems?.length > 0 ? (
        <Pagination
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ) : (
        ''
      )}
    </section>
  )
}

export default WriteList
