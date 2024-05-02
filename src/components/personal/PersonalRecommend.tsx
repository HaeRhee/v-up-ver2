'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SentenceMatch } from '@/util/personal/util'
import ButtonPrimary from '../../util/ButtonPrimary'
import Swal from 'sweetalert2'
import {
  useCurrentMusicQuery,
  usePersonalUserQuery,
  usePreferenceDataQuery,
  useRecommendDataQuery,
} from '@/query/personal/useQueryPersonal'
import { useMutatePersonal } from '@/query/personal/useMutationPersonal'

import type { PersonalRecommendProps } from '@/types/personal/type'

const PersonalRecommend: React.FC<PersonalRecommendProps> = ({ userChar }) => {
  const [checkedList, setCheckedList] = useState<string[]>([])
  const mbtiStatus = userChar.mbti
  const uidStatus = userChar.uid
  const router = useRouter()

  const musicPreferenceData = usePreferenceDataQuery(mbtiStatus)
  const { recommend, isPending, isError } =
    useRecommendDataQuery(musicPreferenceData)
  const resultMusic = recommend?.map((music) => music.musicId) as string[]
  const { personalUser } = usePersonalUserQuery()
  const { current, refetchCurrent } = useCurrentMusicQuery(uidStatus)
  const {
    addPersonalResultMutation,
    updatePersonalResultMutation,
    updateCurrentMusicMutation,
    insertCurrentMusicMutation,
  } = useMutatePersonal(setCheckedList)

  //사용자가 음악을 선택 or 선택해제
  const onChangeCheckMusicHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      const checkList = checkedList.filter((el) => el !== id)
      setCheckedList(checkList)
    }
  }

  //현재 재생 목록
  const currentList =
    current?.length === 0
      ? []
      : current?.[0]?.currentMusicIds || ([] as string[])

  const onSubmitCurrentMusic = () => {
    if (checkedList.length === 0) {
      // alert('선택된 곡이 없습니다.')
      Swal.fire({
        icon: 'error',
        text: '선택된 곡이 없습니다.',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }

    //선택한 음악이 현재 재생목록에 있는 곡인지
    const filterMusic = checkedList.filter((musicId) =>
      currentList.includes(musicId),
    )

    if (filterMusic.length > 0) {
      // alert('이미 현재 재생목록에 있는 곡입니다.')
      Swal.fire({
        icon: 'error',
        text: '이미 현재 재생목록에 있는 곡입니다.',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      setCheckedList([])
      return
    }

    //재생목록이 있는지에 따른 처리
    if (!current || current.length === 0) {
      const musicList = [...checkedList] as string[]
      insertCurrentMusicMutation.mutate({ userId: userChar.uid, musicList })
      refetchCurrent()
    } else {
      const musicList = [...currentList, ...checkedList] as string[]
      updateCurrentMusicMutation.mutate({ userId: userChar.uid, musicList })
      refetchCurrent()
    }
    onSubmitPersonalResult()
  }

  const onSubmitPersonalResult = () => {
    const personalMusicData = {
      userChar,
      resultMusic: resultMusic,
    }

    //퍼스널 진단은 받은 적이 있는지에 따른 처리
    if (personalUser?.find((user) => user.userId === userChar.uid)) {
      // alert('진단 결과 업데이트 및 곡 추가가 완료됐습니다.')
      Swal.fire({
        text: '진단 결과 업데이트 및 곡 추가가 완료됐습니다.',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      updatePersonalResultMutation.mutate(personalMusicData)
      refetchCurrent()
    } else {
      // alert('곡 추가가 완료됐습니다.')
      Swal.fire({
        text: '곡 추가가 완료됐습니다.',
        background: '#2B2B2B',
        color: '#ffffff',
      })
      addPersonalResultMutation.mutate(personalMusicData)
      refetchCurrent()
    }
  }
  const onGoToHomeHandler = () => {
    const personalMusicData = {
      userChar,
      resultMusic: resultMusic,
    }
    updatePersonalResultMutation.mutate(personalMusicData)
    refetchCurrent()
    router.push('/')
  }

  if (isPending) {
    return <div className='text-center'> 열심히 곡을 고르는 중입니다.</div>
  }

  if (isError) {
    return (
      <div className='text-center'>
        에러가 발생했습니다. 잠시 후 다시 시도해주세요
      </div>
    )
  }

  return (
    <div>
      <div className='pt-[16px] text-center text-sm font-medium text-white text-opacity-70'>
        <p className='px-[20px]'>{SentenceMatch(userChar.mbti)}</p>
      </div>
      <div className='pt-[24px] text-center text-white'>
        <p className='text-sm font-medium'>
          당신의 취향에 맞는 음악을 추천 해드릴게요 &#x1F642;
        </p>
      </div>
      <div className='flex justify-center gap-5 pt-[16px] text-white text-opacity-50'>
        {recommend?.map((item) => (
          <label htmlFor={item.musicId} key={item.musicId}>
            <input
              type='checkbox'
              id={item.musicId}
              checked={checkedList.includes(item.musicId)}
              onChange={(e) =>
                onChangeCheckMusicHandler(e.target.checked, item.musicId)
              }
              className='peer hidden'
            />
            <div
              className={`flex w-[130px] justify-center ${checkedList.includes(item.musicId) ? 'text-white' : ''}`}
            >
              <Image
                src={item.thumbnail}
                width={80}
                height={80}
                alt={`${item.musicTitle} 앨범 썸네일`}
                className={`cursor-pointer rounded-full ring-4 ring-transparent ${checkedList.includes(item.musicId) ? 'ring-white ' : ''}`}
              />
            </div>
            <div
              className={`w-[100px] ${checkedList.includes(item.musicId) ? 'text-white' : ''}`}
            >
              <p className='w-[130px] cursor-pointer text-center text-lg font-bold'>
                {item.musicTitle}
              </p>
            </div>
            <div
              className={`text-center text-sm font-medium ${checkedList.includes(item.musicId) ? 'text-white' : ''}`}
            >
              <p>{item.artist}</p>
            </div>
            <div>
              <p className='text-center text-sm'>
                {currentList.includes(item.musicId) ? '추가 완료' : ''}
              </p>
            </div>
          </label>
        ))}
      </div>
      <div className='flex justify-center gap-4 pt-[22px]'>
        <ButtonPrimary onClick={onSubmitCurrentMusic}>
          재생목록에 담기
        </ButtonPrimary>
        <ButtonPrimary onClick={onGoToHomeHandler}>메인으로 가기</ButtonPrimary>{' '}
      </div>
    </div>
  )
}

export default PersonalRecommend
