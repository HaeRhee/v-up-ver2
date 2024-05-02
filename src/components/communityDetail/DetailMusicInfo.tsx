import { DetailMusicInfoType } from '@/types/communityDetail/detailTypes'
import Image from 'next/image'
import React from 'react'

const DetailMusicInfo = ({
  thumbnail,
  musicTitle,
  artist,
  runTime,
}: DetailMusicInfoType) => {
  return (
    <>
      <div className='flex items-center gap-[32px]'>
        <figure className='flex h-[80px] w-[80px] items-center rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)]'>
          <Image
            src={`${thumbnail}`}
            alt='노래 앨범 이미지'
            width={80}
            height={80}
            className='rounded-full '
          />
        </figure>
        <div className='flex flex-col gap-[8px] '>
          <div>
            <p className='text-[24px] font-bold'>{musicTitle}</p>
          </div>
          <div>
            <p className='font-bold text-[rgba(255,255,255,0.4)]'>{artist}</p>
          </div>
        </div>
      </div>
      <div className='flex'>
        <p className='flex items-center text-[16px] font-bold'>{runTime}</p>
      </div>
    </>
  )
}

export default DetailMusicInfo
