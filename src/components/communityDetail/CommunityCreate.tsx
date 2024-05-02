'use client'

import React, { FormEvent, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Swal from 'sweetalert2'

import { useMusicSearchedStore } from '@/shared/store/communityDetailStore'
import {
  useCoummunityItem,
  validateFormBlank,
} from '@/query/communityDetail/mutation'
import useInput from '@/hooks/useInput'
import goback from '@/../public/images/goback.svg'
// CSS 스타일 및 관련 상수
import { ADD_BOARD_STICK, ALLOW_SHADOW } from './communityCss'
import { DOWN_ACTIVE_BUTTON } from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'

import CommunityAddMusic from './CommunityAddMusic'
import { CommunityNoSsrQuillEditor } from './CommunityNoSsrQuillEditor'
import { MusicInfoType } from '@/types/musicPlayer/types'

type CommunityForm = {
  boardTitle: string
  content: string
}

const CommunityCreate = () => {
  // 커뮤니티 등록 페이지, 퀼 에디터 적용
  const router = useRouter()
  const refTitle = useRef<HTMLInputElement>(null)
  const {
    chooseMusic, // 선택한 음악
    setChooseMusic, // 선택한 음악 세팅
    setIsChooseMusic, // 선택한 음악 여부
    setSelectedCardIndex, // 선택한 음악의 index - css로 클릭한 index bg 활성화위해 설정
  } = useMusicSearchedStore()
  const { addCommunityMutation } = useCoummunityItem()

  // 로그인된 유저 정보
  const { data: userSessionInfo, status } = useSession()

  // 선택된 음악의 정보
  const musicId = chooseMusic?.musicId as string
  const musicTitle = chooseMusic?.musicTitle
  const artist = chooseMusic?.artist
  const thumbnail = chooseMusic?.thumbnail

  const item = {
    ...chooseMusic,
  } as MusicInfoType

  const {
    form: communityForm,
    setForm: setCommunityForm,
    onChange: onChangeHandler,
    reset,
  } = useInput<CommunityForm>({
    boardTitle: '',
    content: '',
  })

  const { boardTitle, content } = communityForm

  // 등록 핸들러
  const onSumitHandler = async (e: FormEvent) => {
    e.preventDefault()

    // 입력값의 유효성 검사하는 함수 - validateFormBlank
    const { firstBlank: titleBlank, secondBlank: contentBlack } =
      validateFormBlank(boardTitle, content)

    if (!boardTitle || titleBlank === '') {
      await Swal.fire({
        text: '제목을 입력해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })

      return
    }

    if (!content || contentBlack === '') {
      await Swal.fire({
        text: '내용을 입력해 주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    // 선택한 음악의 내용이 없을 때
    if (!chooseMusic) {
      await Swal.fire({
        text: '음악 선택은 필수입니다!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    // 유저 정보가 있을 경우 게시글을 등록
    if (userSessionInfo && userSessionInfo.user.uid) {
      const { uid } = userSessionInfo.user
      const newData = {
        boardTitle,
        content: content,
        userId: uid,
        musicId,
      }

      addCommunityMutation.mutate(newData)
      await Swal.fire({
        icon: 'success',
        title: '게시글 등록이 완료됐습니다.',

        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      reset()
      // 등록 후 상태관리(스토리지에 저장되게 한 내용)내용 비우기
      setChooseMusic(null)
      router.push('/community')
    }

    if (!userSessionInfo) {
      Swal.fire({
        icon: 'warning',
        text: '오류로 인해 정보를 저장할 수 없습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }
  }

  if (status === 'unauthenticated') {
    Swal.fire({
      icon: 'warning',
      text: '로그인한 유저만 이용 가능합니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#685BFF',
      color: '#ffffff',
      background: '#2B2B2B',
    })
    router.replace('/')
    return
  }

  // 컴포넌트가 마운트될 때, 제목에 포커스 및 내용 미리 비워줌
  useEffect(() => {
    if (refTitle.current !== null) {
      refTitle.current.focus()
    }

    setChooseMusic(null)
    setIsChooseMusic(false)
    setSelectedCardIndex(null)
  }, [])

  return (
    <div>
      <div>
        <form onSubmit={onSumitHandler} className='flex flex-col gap-[32px]'>
          <div
            className={`relative  mt-[32px] flex h-[72px] w-[100%] items-center justify-between rounded-[16px] border-[4px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[24px] py-[12px] tracking-[-0.03em] ${ADD_BOARD_STICK}`}
          >
            <div className='absolute left-[45%] top-[32.5%] mx-[auto]  text-center'>
              <h3>글쓰기</h3>
            </div>
            <div className='flex w-full justify-between'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  router.replace('/community')
                  setChooseMusic(null)
                }}
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
              >
                <Image
                  src={goback}
                  alt='이전으로 아이콘'
                  width={24}
                  height={24}
                />
              </button>
              <button
                className={`flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
              >
                <p>등록하기</p>
              </button>
            </div>
          </div>

          <div>
            <div className='w-full'>
              <input
                type='text'
                name='boardTitle'
                value={boardTitle}
                ref={refTitle}
                maxLength={40}
                onChange={onChangeHandler}
                className=' mb-4 w-full rounded-lg border-none bg-[rgba(255,255,255,0.1)] p-2 placeholder:text-[#ffffff5a]'
                placeholder='제목을 입력해 주세요.(40자 이내)'
              />
            </div>

            <article className='h-[200px] text-[16px]'>
              {/* 에디터 적용 */}
              <CommunityNoSsrQuillEditor
                theme='snow'
                content={content}
                setCommunityForm={setCommunityForm}
              />
            </article>
          </div>
        </form>
        <ul className='mt-[88px]'>
          <CommunityAddMusic
            thumbnail={thumbnail}
            musicTitle={musicTitle}
            artist={artist}
            item={item}
          />
        </ul>
      </div>
    </div>
  )
}

export default CommunityCreate
