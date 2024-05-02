import close from '@/../public/images/close-button.svg'
import search from '@/../public/images/community-detail-Image/search-button.svg'
import useInput from '@/hooks/useInput'
import { getSearchedMusicData } from '@/shared/search/api'
import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import { usePaginationStore } from '@/shared/store/paginationStore'
import { useModalMusicResultStore } from '@/shared/store/searchStore'
import type { MusicInfoType } from '@/types/musicPlayer/types'
import Pagination from '@/util/Pagination '
import { paging, resetPagination } from '@/util/util'
import Image from 'next/image'
import React, { FormEvent, KeyboardEvent, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { GOBACK_SHADOW } from '../communityDetail/detailCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import { DOWN_ACTIVE_BUTTON, OPEN_ANOTHER_SHADOW } from '../login/loginCss'
import ModalMusicData from './ModalMusicData'

const MusicSearchModal = ({
  setIsModal,
}: {
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // 선택한 음악 정보, 상태 유무 체크
  const { chooseMusic, isChooseMusic, setIsChooseMusic } =
    useMusicSearchedStore()
  const [musicList, setMusicList] = useState<MusicInfoType[]>([])

  const setCurrentPageData = usePaginationStore(
    (state) => state.setCurrentPageData,
  )
  const { currentPageData } = usePaginationStore()
  const { currentPage } = currentPageData
  const { form: keywordInput, onChange } = useInput({
    keyword: '',
  })
  const { keyword } = keywordInput
  const keywordRef = useRef<HTMLInputElement>(null)
  const modalMusicResult = useModalMusicResultStore(
    (state) => state.modalMusicResult,
  )

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword) {
      alert('검색 키워드를 입력해 주세요')
      keywordRef.current?.focus()
      return
    }

    const getMusicData = async (keyword: string) => {
      const data = await getSearchedMusicData(keyword)
      modalMusicResult(data as MusicInfoType[])

      if (data && data?.length > 0) {
        setMusicList(data)
        resetPagination(setCurrentPageData)
      } else {
        alert('검색 결과가 없습니다')
        return
      }
    }
    getMusicData(keyword)
    setIsChooseMusic(false) // 음악 선택 해제위한 상태
  }

  const { currentItems, nextPage, prevPage, totalPages } = paging(
    musicList,
    currentPage,
    setCurrentPageData,
    5,
  )
  // 음악 등록 버튼
  const onAddViewMusicHandler = async () => {
    if (!isChooseMusic || !chooseMusic) {
      await Swal.fire({
        text: '음악을 선택해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    await Swal.fire({
      text: '음악이 등록되었습니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })
    setIsModal(false)
  }
  // MusicSearchModal 컴포넌트에서 사용되는 키 입력 이벤트 핸들러 - 등록 이벤트
  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    // 키가 'Enter'인지 확인
    if (e.key === 'Enter') {
      e.preventDefault()
      // 새 이벤트 생성
      const submitEvent = new Event('submit', {
        bubbles: true, // 버블링 활성화
        cancelable: true, // 취소 가능하도록 설정
      })
      // 현재 버튼의 부모 요소에 이벤트 전파
      e.currentTarget.form?.dispatchEvent(submitEvent)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-50'>
      <div
        className={`${GOBACK_SHADOW} relative flex h-[680px] w-[516px] flex-col items-center justify-center overflow-y-scroll rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] scrollbar-hide ${OPEN_ANOTHER_SHADOW} `}
      >
        <form
          onSubmit={onSubmitHandler}
          className=' absolute top-0 mt-[40px] flex w-full'
        >
          <div className='relative m-[0px_auto]'>
            <input
              type='text'
              name='keyword'
              value={keyword}
              ref={keywordRef}
              onChange={onChange}
              placeholder='가수 또는 노래 제목을 입력해주세요'
              className={` placeholeder:tracking-[-0.03em] mx-[auto] w-[300px] rounded-[12px] bg-[rgba(255,255,255,0.1)] px-[8px] py-[16px] text-[14px]  ${OPEN_ANOTHER_SHADOW}`}
            />
            <button
              type='submit'
              className='absolute right-[2%] top-[12%] m-[10px]'
            >
              <Image src={search} alt='검색 아이콘' width={24} height={24} />
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            setIsModal(false)
            setIsChooseMusic(false)
          }}
          className='absolute right-[32px] top-[32px] h-[24px] w-[24px]'
        >
          <Image src={close} alt='닫기 아이콘' width={24} height={24} />
        </button>
        <div className='mt-[36px] flex flex-col'>
          <div>
            <div className='flex h-[408px] w-full flex-col items-start gap-[12px] overflow-y-scroll scrollbar-hide '>
              {currentItems.map((item: any, index: number) => {
                return (
                  <ModalMusicData
                    key={item.musicId}
                    item={item}
                    index={index}
                  />
                )
              })}
            </div>
            <div className='mt-[16px] [&_div]:m-0'>
              {currentItems && currentItems.length > 0 && (
                <Pagination
                  totalPages={totalPages}
                  prevPage={prevPage}
                  nextPage={nextPage}
                />
              )}
            </div>
          </div>
        </div>
        <div className='absolute bottom-[22px] flex flex-row items-center justify-center shadow-primary'>
          <button
            onClick={onAddViewMusicHandler}
            onKeyUp={handleKeyUp}
            className='rounded-lg px-[10px] text-white'
          >
            <span
              className={`flex h-[48px] w-[160px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
            >
              등록
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicSearchModal
