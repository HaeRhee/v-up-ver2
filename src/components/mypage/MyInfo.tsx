'use client'

import right from '@/../public/images/chevron-right.svg'
import pencil from '@/../public/images/pencil-line.svg'
import defaultUserImg from '@/../public/images/userDefaultImg.svg'
import { GET_USER_INFO } from '@/query/user/userQueryKeys'
import {
  getUserAndPlaylistData,
  updateUserInfo,
  uploadUserThumbnail,
} from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import ButtonPrimary from '../../util/ButtonPrimary'
import FollowerList from './FollowerList'
import FollowingList from './FollowingList'
import Modal from './Modal'
import MyPlaylist from './MyPlaylist'
import TabMenu from './TabMenu'

const MyInfo = () => {
  const { data: userSessionInfo, status } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  const [userImage, setUserImage] = useState('')

  const [isModal, setIsModal] = useState(false)
  const [isFollowModal, setIsFollowModal] = useState(false)
  const [nickname, setNickname] = useState('')
  const [checkText, setCheckText] = useState('')
  const nicknameRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  //항목별 공개 여부에 따른 체크박스 렌더링을 위한 useState
  const [isVisibility, setIsVisibility] = useState({
    mbtiOpen: false,
    personalMusicOpen: false,
    playlistOpen: false,
    postsOpen: false,
    likedPostsOpen: false,
  })

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(uid),
    queryKey: [GET_USER_INFO.MYPAGE, uid],
    enabled: !!uid,
  })

  const updateUserInfoMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_INFO.MYPAGE] })
    },
  })

  const updateUserThumbnailMutation = useMutation({
    mutationFn: uploadUserThumbnail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_INFO.MYPAGE] })
    },
  })

  const onClickViewModalHandler = () => {
    setIsModal(true)
  }

  const onClickCloseModalHandler = () => {
    setIsModal(false)
    if (data) {
      setNickname(data.nickname)
      setIsVisibility({
        mbtiOpen: data.mbtiOpen,
        personalMusicOpen: data.personalMusicOpen,
        playlistOpen: data.playlistOpen,
        postsOpen: data.postsOpen,
        likedPostsOpen: data.likedPostsOpen,
      })
    }
    setCheckText('')
  }

  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsVisibility((prev) => {
        return { ...prev, [e.target.name]: true }
      })
    } else {
      setIsVisibility((prev) => {
        return { ...prev, [e.target.name]: false }
      })
    }
  }

  const onClickUpdateHandler = async () => {
    if (!nickname.trim()) {
      setCheckText('닉네임을 입력해주세요')
      nicknameRef.current?.focus()
      return
    }
    try {
      const {
        likedPostsOpen,
        mbtiOpen,
        personalMusicOpen,
        playlistOpen,
        postsOpen,
      } = isVisibility
      updateUserInfoMutation.mutateAsync({
        userId: uid,
        nickname,
        likedPostsOpen,
        mbtiOpen,
        personalMusicOpen,
        playlistOpen,
        postsOpen,
      })
      setNickname(nickname)
      setIsVisibility({
        likedPostsOpen,
        mbtiOpen,
        personalMusicOpen,
        playlistOpen,
        postsOpen,
      })

      await Swal.fire({
        icon: 'success',
        title: '정보 변경이 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      setIsModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  //닉네임 입력하지 않았을 때 노출되는 텍스트
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value
    setNickname(nickname)
    if (nickname.trim() && checkText) {
      setCheckText('')
    }
  }

  //이미지 업로드
  const selectFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0] as File

    // if (window.confirm('선택한 이미지로 업로드를 진행할까요?')) {
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: '선택된 이미지가 없습니다. 이미지를 선택해주세요.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
      return
    }
    const data = await updateUserThumbnailMutation.mutateAsync({
      userId: uid,
      file,
    })

    if (data) {
      setUserImage(data?.[0].userImage as string)
      await Swal.fire({
        icon: 'success',
        title: '업로드가 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
    } else {
      await Swal.fire({
        icon: 'error',
        title: '파일이 업로드 되지 않았습니다.',
        showConfirmButton: false,
        timer: 1500,
        background: '#2B2B2B',
        color: '#ffffff',
      })
    }
    // }
  }

  const onClickCloseFollowModalHandler = () => {
    setIsFollowModal(false)
  }

  const onClickViewFollowModalHandler = () => {
    setIsFollowModal(true)
  }

  const tabArr = [
    {
      id: 0,
      title: '팔로워',
      content: <FollowerList data={data?.following!} />,
    },
    {
      id: 1,
      title: '팔로잉',
      content: <FollowingList data={data?.following!} />,
    },
  ]

  useEffect(() => {
    if (data) {
      setNickname(data.nickname)
      setUserImage(data?.userImage)
      setIsVisibility({
        mbtiOpen: data.mbtiOpen,
        personalMusicOpen: data.personalMusicOpen,
        playlistOpen: data.playlistOpen,
        postsOpen: data.postsOpen,
        likedPostsOpen: data.likedPostsOpen,
      })
    }
  }, [data])

  const shadow =
    'shadow-[0px_4px_4px_#00000033,0px_0px_0px_1px_#0000001a,0px_0px_0px_4px_#685bff1a,0px_0px_0px_3px_#ffffff33,inset_0px_1px_2px_#ffffff33,inset_0px_4px_1px_#ffffff33,inset_0px_-4px_1px_#0000001a]'

  const inputShadow =
    'shadow-[0px_4px_1px_#0000001a,0px_-4px_4px_#ffffff1a,0px_0px_0px_3px_#ffffff33,inset_0px_1px_2px_#0000001a,inset_0px_-4px_1px_#ffffff0d,inset_0px_4px_1px_#0000004d] drop-shadow-[0px_4px_4px_#0000003f]'

  const inputFocus = 'focus:border-primary drop-shadow-none'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/')
    }
  }, [router, status])

  if (isError) {
    return <>에러발생</>
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <section>
      <div>
        <div className='mb-4 flex items-center justify-between pt-1'>
          <div>
            <figure className='flex h-[84px] w-[84px] overflow-hidden rounded-full border-2 border-[#ffffff1a] bg-[#2b2b2b]'>
              {!userImage ? (
                <Image
                  src={defaultUserImg}
                  width={80}
                  height={80}
                  alt={`${data?.nickname} 프로필 이미지`}
                  priority={true}
                />
              ) : (
                <Image
                  src={userImage}
                  width={80}
                  height={80}
                  alt={`${data?.nickname} 프로필 이미지`}
                  priority={true}
                />
              )}
            </figure>
          </div>
          <Link
            href='/personal-music'
            className={`bg-primary p-3 ${shadow} rounded-xl text-[1rem] font-bold tracking-[-0.03em]`}
          >
            퍼스널 뮤직 진단 다시받기
          </Link>
        </div>
        <div className='my-2'>
          <span
            className=' inline-flex cursor-pointer items-center gap-2 text-[1.125rem] font-bold leading-6 tracking-[-0.03em]'
            onClick={onClickViewModalHandler}
          >
            {data?.nickname}{' '}
            <Image src={right} width={24} height={24} alt='정보 수정하기' />
          </span>
        </div>
        <p
          onClick={onClickViewFollowModalHandler}
          className=' cursor-pointer text-[1.125rem]'
        >
          <span className='inline-block text-[#ffffff80]'>팔로워</span>
          <span className='ml-2 inline-block font-bold text-white'>
            {!data?.follower ? 0 : data?.follower.length}
          </span>
          <span className='ml-4 inline-block text-[#ffffff80]'>팔로잉</span>
          <span className='ml-2 inline-block font-bold text-white'>
            {!data?.following ? 0 : data?.following?.length}
          </span>
        </p>
        <p className='mt-2 flex flex-wrap gap-4 text-[1rem] font-bold tracking-[-0.03em] text-[#ffffff80]'>
          <span>{data?.userChar?.mbti}</span>{' '}
          {data?.userChar?.mbti && data?.userChar?.resultSentence ? '|' : ''}{' '}
          <span>{data?.userChar?.resultSentence}</span>
        </p>
      </div>
      <MyPlaylist data={data!} />
      {isModal && (
        <Modal onClick={onClickCloseModalHandler}>
          <div className='px-[3.25rem] tracking-[-0.03em]'>
            <label className='relative mx-auto mb-8 mt-4 block h-[84px] w-[84px] cursor-pointer overflow-hidden rounded-full border-2 border-[#ffffff1a] bg-[#00000080] text-center [&>input]:hidden'>
              <figure className=''>
                {!userImage ? (
                  <Image
                    src={defaultUserImg}
                    width={80}
                    height={80}
                    alt={`${data?.nickname} 프로필 이미지`}
                    className='blur-sm'
                  />
                ) : (
                  <Image
                    src={userImage}
                    width={80}
                    height={80}
                    alt={`${data?.nickname} 프로필 이미지`}
                    className='blur-sm'
                  />
                )}
              </figure>
              <Image
                src={pencil}
                width={24}
                height={24}
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                alt='수정 아이콘'
              />
              <input
                type='file'
                onChange={selectFileHandler}
                accept='image/*'
              />
            </label>
            <label
              htmlFor='nickname'
              className='inline-block pb-[2px] text-[0.875rem] text-[#ffffff4c]'
            >
              닉네임
            </label>
            <input
              id='nickname'
              type='text'
              value={nickname}
              className={`mb-1 block w-full rounded-xl border-2 border-[#ffffff1a] bg-[#ffffff1a] p-3 ${inputShadow} text-[1rem] font-bold outline-none ${inputFocus} [&_placeholder]:text-[#ffffff4d]`}
              ref={nicknameRef}
              onChange={onChangeInput}
              maxLength={10}
              placeholder='변경할 닉네임을 입력해주세요'
            />

            <p className='h-5 text-sm text-red-500'>{checkText}</p>
            <h3 className='mb-8 mt-3 flex items-baseline text-[0.875rem] font-bold text-[#ffffff4c]'>
              내 활동 공개여부{' '}
              <span className='pl-2 text-[0.75rem]'>
                * 체크 비활성화 시 다른 유저에게 보이지 않습니다.
              </span>
            </h3>
            <ul className='flex flex-col gap-8 font-bold'>
              <li>
                <label>
                  <input
                    type='checkbox'
                    name='personalMusicOpen'
                    checked={isVisibility.personalMusicOpen}
                    onChange={onChangeCheck}
                  />{' '}
                  <span className='pl-2 text-[0.875rem]'>퍼스널 뮤직</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type='checkbox'
                    name='mbtiOpen'
                    checked={isVisibility.mbtiOpen}
                    onChange={onChangeCheck}
                  />{' '}
                  <span className='pl-2 text-[0.875rem]'>MBTI</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type='checkbox'
                    name='postsOpen'
                    checked={isVisibility.postsOpen}
                    onChange={onChangeCheck}
                  />{' '}
                  <span className='pl-2 text-[0.875rem]'>작성한 게시물</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type='checkbox'
                    name='likedPostsOpen'
                    checked={isVisibility.likedPostsOpen}
                    onChange={onChangeCheck}
                  />{' '}
                  <span className='pl-2 text-[0.875rem]'>좋아요 한 글</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type='checkbox'
                    name='playlistOpen'
                    checked={isVisibility.playlistOpen}
                    onChange={onChangeCheck}
                  />{' '}
                  <span className='pl-2 text-[0.875rem]'>플레이리스트</span>
                </label>
              </li>
            </ul>
            <div className='mt-4 text-center'>
              <ButtonPrimary onClick={onClickUpdateHandler}>
                수정하기
              </ButtonPrimary>
            </div>
          </div>
        </Modal>
      )}

      {isFollowModal && (
        <Modal onClick={onClickCloseFollowModalHandler}>
          <TabMenu data={tabArr} width={'w-1/2'} />
        </Modal>
      )}
    </section>
  )
}

export default MyInfo
