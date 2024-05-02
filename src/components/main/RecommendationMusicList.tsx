'use client'

import { GENRE_MUSIC_QUERY_KEY } from '@/query/genreMusic/queryKeys'
import { getGenreMusicData } from '@/shared/main/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import GenreMusicItem from './GenreMusicItem'
import SectionTitle from './SectionTitle'
import SlideButton from './SlideButton'

const RecommendationMusicList = ({
  musicPreferenceData,
}: {
  musicPreferenceData: number[]
}) => {
  const [position, setPosition] = useState(0)
  const session = useSession()

  const check = session.status === 'authenticated'

  const MOVE_POINT = 136 + 24 //임시값 - 슬라이드로 이동할 값

  //mbti 있을 때
  //상위 컴포넌트로 받은 top3 장르를 기반으로 뮤직 테이블에서 10개 조회
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getGenreMusicData(musicPreferenceData),
    queryKey: [GENRE_MUSIC_QUERY_KEY.GET_MAIN_GENRE_MUSIC, musicPreferenceData],
    enabled: !!musicPreferenceData,
  })

  const onClickPrevHandler = () => {
    if (position < 0) {
      setPosition((prev) => prev + MOVE_POINT)
    }
  }

  const onClickNextHandler = () => {
    setPosition((prev) => prev - MOVE_POINT)
  }

  return (
    <section className={` ${!check ? 'pl-10' : 'pl-20'} my-8`}>
      <SectionTitle>이런 음악은 어떠신가요?🎶</SectionTitle>
      <div className='relative flex overflow-hidden'>
        <ul
          className='flex flex-nowrap'
          style={{
            transition: 'all 0.4s ease-in-out',
            transform: `translateX(${position}px)`,
          }}
        >
          {data?.map((item) => {
            return <GenreMusicItem key={item.musicId} item={item} />
          })}
        </ul>
        <SlideButton
          position={position}
          movePoint={MOVE_POINT}
          length={data?.length ? data?.length : 0}
          onClickNextHandler={onClickNextHandler}
          onClickPrevHandler={onClickPrevHandler}
        />
      </div>
    </section>
  )
}

export default RecommendationMusicList
