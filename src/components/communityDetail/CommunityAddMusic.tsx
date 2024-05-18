import Image from 'next/image'
import MusicSearch from '../search/MusicSearch'
import type { AddMusicProps } from '@/types/communityDetail/detailTypes'
import { ADDED_CURRENT_MUSIC_SHADOW } from './communityCss'
import { dragHandler } from '@/util/util'

const CommunityAddMusic = ({
  thumbnail,
  musicTitle,
  artist,
  item,
}: AddMusicProps) => {
  return (
    <li
      draggable='true'
      onDragStart={(e) => {
        dragHandler(e, item)
      }}
    >
      <article className='flex flex-col gap-[16px]'>
        <section className='flex gap-[16px] md:flex-col'>
          <MusicSearch />
          <article
            className={`flex h-[88px] w-[602px] gap-[16px] rounded-[16px] bg-[rgba(255,255,255,0.1)] p-[16px] md:w-[335px] ${ADDED_CURRENT_MUSIC_SHADOW} flex gap-[16px]`}
          >
            <section className='flex gap-[16px]'>
              <div className='flex items-center'>
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt='노래앨범이미지'
                    width={56}
                    height={56}
                    className='rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)]'
                  />
                ) : (
                  <div className='h-[56px] w-[56px] rounded-full border-[2px] border-solid border-[rgba(255,255,255,0.1)]'>
                    <i></i>
                  </div>
                )}
              </div>
              <article className='flex w-full items-center justify-center [&_div]:flex [&_div]:gap-[16px]'>
                <div className='flex w-full items-center'>
                  <p className='text-[24px] font-bold'>{musicTitle}</p>

                  <p className='text-[16px] font-bold'>{artist}</p>
                </div>
              </article>
            </section>
          </article>
        </section>
        <div>
          <p className='text-[14px] text-[rgba(255,255,255,0.5)]'>
            게시글을 등록하기 위해 음악을 추가해야 돼요!
            <br />
            등록한 음악을 플레이어에 끌어놓고 미리 들어보아요!
          </p>
        </div>
      </article>
    </li>
  )
}

export default CommunityAddMusic
