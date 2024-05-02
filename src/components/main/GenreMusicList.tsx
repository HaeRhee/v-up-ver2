'use client'

import { PERSONAL_QUERY_KEYS } from '@/query/personal/keys.constant'
import { GET_USER_INFO } from '@/query/user/userQueryKeys'
import { getMusicPreferenceData, getUserChar } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import RandomMusicList from './RandomMusicList'
import RecommendationMusicList from './RecommendationMusicList'

const GenreMusicList = () => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  const { data: userData } = useQuery({
    queryFn: () => getUserChar(uid),
    queryKey: [PERSONAL_QUERY_KEYS.PERSONAL_USER],
    enabled: !!uid,
  })

  //유저의 mbti 기반으로 top3 선호 장르 추출하여 props로 값 전달
  const { data: musicPreferenceData } = useQuery({
    queryFn: () => getMusicPreferenceData(userData?.userChar.mbti as number),
    queryKey: [GET_USER_INFO.USER_MUSIC_PREFERENCE, userData],
    enabled: typeof userData?.userChar?.mbti === 'number',
  })

  return (
    <>
      {musicPreferenceData ? (
        <RecommendationMusicList musicPreferenceData={musicPreferenceData} />
      ) : (
        <RandomMusicList />
      )}
    </>
  )
}

export default GenreMusicList
