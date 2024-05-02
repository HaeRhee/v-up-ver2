import Image from 'next/image'
import React from 'react'
import goback from '@/../public/images/community-detail-Image/back-allow.svg'
import { ALLOW_SHADOW, BOARD_TITLE_SHADOW } from './communityCss'
import { DOWN_ACTIVE_BUTTON } from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import { ContentsHeaderProps } from '@/types/communityDetail/detailTypes'

const ContentsHeader = ({
  isEdit,
  onEditCancelHandler,
  onBackButtonHandler,
  onBoardEditCompleteHandler,
}: ContentsHeaderProps) => {
  return (
    <section
      className={`justify-betweeen relative mt-[32px] flex h-[72px] w-[100%] items-center rounded-[16px] border-[4px] border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] px-[16px] py-[12px] ${BOARD_TITLE_SHADOW}`}
    >
      <div>
        {isEdit ? (
          <button
            onClick={onEditCancelHandler}
            className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
          >
            <Image src={goback} alt='수정취소 아이콘' width={24} height={24} />
          </button>
        ) : (
          <button
            onClick={onBackButtonHandler}
            className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.1)] ${ALLOW_SHADOW}`}
          >
            <Image src={goback} alt='이전으로 아이콘' width={24} height={24} />
          </button>
        )}
      </div>
      <h3 className='mx-[auto] text-[18px] font-bold'>음악 추천 게시판🦻</h3>
      {isEdit ? (
        <div className='absolute right-[12px] top-[12.5%]'>
          <button
            onClick={onBoardEditCompleteHandler}
            className={`flex h-[48px] w-[120px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
          >
            <p>수정완료</p>
          </button>
        </div>
      ) : null}
    </section>
  )
}
export default ContentsHeader
