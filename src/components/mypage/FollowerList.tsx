import { GET_USER_INFO } from '@/query/user/userQueryKeys'
import { getFollowDataFollower, updateFollow } from '@/shared/mypage/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import ButtonSecondary from '../../util/ButtonSecondary'

type FollowProps = {
  data: string[]
}

const FollowerList = ({ data }: FollowProps) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string
  const queryClient = useQueryClient()

  const {
    data: followData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getFollowDataFollower(uid),
    queryKey: [GET_USER_INFO.MY_FOLLOWER],
    enabled: !!uid,
  })

  const unFollowMutation = useMutation({
    mutationFn: updateFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_INFO.MY_FOLLOWER] })
      queryClient.invalidateQueries({ queryKey: [GET_USER_INFO.MYPAGE] })
      queryClient.invalidateQueries({ queryKey: [GET_USER_INFO.MY_FOLLOWING] })
    },
  })

  //언팔로우 기능
  const onClickUnFollow = (userId: string, targetId: string) => {
    //나의 팔로잉 데이터에서 타겟과 같은 id를 갖는 유저를 빼고 담는다.
    const newData = data.filter((item) => item !== targetId)
    //언팔할 타켓의 팔로워 데이터를 가져와서 변수에 담는다
    const targetUserData = followData?.find(
      (item) => item.userId === targetId,
    )?.follower
    //타켓 유저의 팔로워 데이터에서 '나' 를 뺀 데이터를 변수에 담는다.
    const newTargetData = targetUserData?.filter((item) => item !== userId)!

    //나의 팔로잉 데이터와 타겟의 팔로워 데이터를 업데이트 한다.
    unFollowMutation.mutate({
      userId,
      targetId,
      followingData: newData,
      newTargetData,
    })
  }

  //팔로우 기능
  const onClickFollow = (userId: string, targetId: string) => {
    const prevData = data ? data : []
    //나의 팔로잉 데이터에 타겟의 id를 추가한 배열을 만든다.
    const newData = [...prevData, targetId]

    //나의 팔로우 데이터에서 타겟과 같은 id를 가진 유저의 팔로워 데이터를 변수에 담는다.
    const newTargetData = followData?.find(
      (item) => item.userId === targetId,
    )?.follower!
    //타겟의 팔로워 데이터에 나의 아이디를 추가한다.
    newTargetData?.push(userId)

    //나의 팔로잉 데이터와 타겟의 팔로워 데이터를 업데이트 한다.
    unFollowMutation.mutate({
      userId,
      targetId,
      followingData: newData,
      newTargetData,
    })
  }

  if (isError) {
    return '에러가 발생했습니다!'
  }

  if (isLoading) {
    return '데이터를 불러오는 중입니다.'
  }

  return (
    <ul className='list-none'>
      {followData?.map((item) => {
        return (
          <li key={item.userId} className='flex justify-between py-4'>
            <div className='flex items-center'>
              <figure className='flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full'>
                {item.userImage && (
                  <Image
                    src={item.userImage}
                    width={56}
                    height={56}
                    alt={`${item.nickname} 프로필 이미지`}
                  />
                )}
              </figure>
              <Link
                href={`/userpage/${item.userId}`}
                className='ml-4 text-[1.125rem]'
              >
                {item.nickname}
              </Link>
            </div>
            <>
              {data && !data.find((el) => el === item.userId) ? (
                <ButtonSecondary
                  onClick={() => onClickFollow(uid, item.userId)}
                >
                  팔로우
                </ButtonSecondary>
              ) : (
                <ButtonSecondary
                  onClick={() => onClickUnFollow(uid, item.userId)}
                >
                  취소
                </ButtonSecondary>
              )}
            </>
          </li>
        )
      })}
      {followData?.length === 0 && (
        <li className='text-center'>팔로워 리스트가 나타납니다.</li>
      )}
    </ul>
  )
}

export default FollowerList
