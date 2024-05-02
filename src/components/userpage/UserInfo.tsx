import { getUserAndPlaylistData, updateFollow } from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UserPlaylist from './UserPlaylist'
import { useSession } from 'next-auth/react'
import ButtonPrimary from '../../util/ButtonPrimary'
import ButtonSecondary from '../../util/ButtonSecondary'
import { GET_USER_INFO } from '@/query/user/userQueryKeys'

const UserInfo = () => {
  const { id } = useParams<{ id: string }>()
  const { data: userSessionInfo, status } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()

  const [isFollow, setIsFollow] = useState(false)
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserAndPlaylistData(id),
    queryKey: [`userpage-${id}`, id],
    enabled: !!id,
  })

  const { data: myInfo } = useQuery({
    queryFn: () => getUserAndPlaylistData(uid),
    queryKey: [GET_USER_INFO.MYPAGE, uid],
    enabled: !!uid,
  })

  const unFollowMutation = useMutation({
    mutationFn: updateFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_INFO.MYPAGE] })
      queryClient.invalidateQueries({ queryKey: [`userpage-${id}`] })
    },
  })

  //언팔로우 기능
  const onClickUnFollow = () => {
    //나의 팔로잉 데이터와 타켓의 팔로워 데이터에서 각각 삭제 후 데이터 업데이트
    const newData = myInfo?.following.filter((item) => item !== id)!
    const newTargetData = data?.follower?.filter((item) => item !== uid)!

    unFollowMutation.mutate({
      userId: uid,
      targetId: id,
      followingData: newData,
      newTargetData,
    })
    setIsFollow(false)
  }

  //팔로우 기능
  const onClickFollow = () => {
    //나의 팔로잉 유저의 데이터 slice로 복사 후 팔로우할 유저 id push로 추가
    const newData = myInfo?.following?.slice()!
    newData.push(id)
    //타겟의 팔로워 데이터를 slice로 복사 후 타겟의 팔로워 데이터에 나의 아이디 추가
    const newTargetData = data?.follower.slice()!
    newTargetData?.push(uid)

    unFollowMutation.mutate({
      userId: uid,
      targetId: id,
      followingData: newData,
      newTargetData,
    })
    setIsFollow(true)
  }

  //팔로우 상태일 경우 언팔 버튼 렌더링
  useEffect(() => {
    if (data?.follower.find((id) => id === uid)) {
      setIsFollow(true)
    }
  }, [data])

  //미 로그인 시 접근 불가처리
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/')
    }
  }, [router, status])

  //자기의 유저페이지에는 접근 할 수 없도록 막음
  useEffect(() => {
    if (uid === id) {
      router.replace('/')
    }
  }, [router])

  if (isError) {
    return <>에러발생</>
  }

  if (isLoading) {
    return <>로딩중</>
  }

  return (
    <section>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <figure className='flex h-[84px] w-[84px] overflow-hidden rounded-full border-2 border-[#ffffff1a] bg-[#2b2b2b]'>
              {data?.userImage && (
                <Image
                  src={data?.userImage}
                  width={80}
                  height={80}
                  alt={`${data?.nickname} 프로필 이미지`}
                  priority={true}
                />
              )}
            </figure>
          </div>
          <div className='[&_button]:min-w-[118px]'>
            {isFollow ? (
              <ButtonSecondary onClick={onClickUnFollow}>
                팔로잉
              </ButtonSecondary>
            ) : (
              <ButtonPrimary onClick={onClickFollow}>팔로우</ButtonPrimary>
            )}
          </div>
        </div>
        <p className='my-2 text-[1.125rem] font-bold tracking-[-0.03em]'>
          {data?.nickname}
        </p>
        <p className='text-[1.125rem]'>
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
          {data?.mbtiOpen ? <span>{data?.userChar?.mbti}</span> : ''}
          {data?.mbtiOpen && data?.personalMusicOpen ? '|' : ''}
          {data?.personalMusicOpen ? (
            <span>{data?.userChar?.resultSentence}</span>
          ) : (
            ' '
          )}
        </p>
      </div>
      <UserPlaylist data={data!} isVisibility={data?.playlistOpen!} />
    </section>
  )
}

export default UserInfo
