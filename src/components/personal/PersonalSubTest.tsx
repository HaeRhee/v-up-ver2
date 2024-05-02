import React, { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useSession } from 'next-auth/react'
import ButtonPrimary from '@/util/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'
import left from '@/../public/images/double_arrow_left.svg'
import right from '@/../public/images/double_arrow.svg'
import Image from 'next/image'
import {
  DROP_SHADOW,
  INPUT_SHADOW,
  INPUT_FOCUS,
  OPEN_ANOTHER_SHADOW,
} from '../login/loginCss'
import { useMutateUserChar } from '@/query/personal/useMutationPersonal'

import type { PersonalInfo } from '@/types/personal/type'

const PersonalSubTest = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  //똑같이 입력한 성별, mbti를 기억하고 db에넣기위해 zustand로 관리
  const { addUserChar, userGender, userChar } = useSurvey()
  const { data: userSessionInfo } = useSession()
  const userId = userSessionInfo?.user?.uid as string
  const insertUserCharMutation = useMutateUserChar()

  //퍼스널 진단을 한적이 있다면, 기존 mbti를 불러오기 위해 zustand에서 꺼내온다.
  const exMbti = userChar.mbti
  const [exEI, exSN, exTF, exPJ] = exMbti.split('')

  //mbti는 checkList로 선택하며 t/f의 값에 따라 관리
  //참 : E/N/T/J , 거짓: I/S/F/P
  const [EI, setEI] = useState<boolean>(exEI === 'E' ? false : true ?? false)
  const [SN, setSN] = useState<boolean>(exSN === 'N' ? false : true ?? false)
  const [TF, setTF] = useState<boolean>(exTF === 'F' ? false : true ?? false)
  const [PJ, setPJ] = useState<boolean>(exPJ === 'J' ? false : true ?? false)

  //선택한 mbti는 각 한 글자씩(I,S,T,P) 이므로 (ISTP)로 합치는 작업
  const calculateMBTI = () => {
    const changeEI = EI ? 'I' : 'E'
    const changeSN = SN ? 'S' : 'N'
    const changeTF = TF ? 'T' : 'F'
    const changePJ = PJ ? 'P' : 'J'

    return changeEI + changeSN + changeTF + changePJ
  }

  const mbti = calculateMBTI()

  const onsubmitResultHandler = () => {
    //입력한 성별+mbti를 zustand에 추가하는 함수
    addUserChar({ gender: userGender, mbti, uid: userId })
    const personalUser: PersonalInfo = {
      mbti: mbti,
      gender: userGender,
    }

    insertUserCharMutation.mutate({ userId: userId, personalUser })

    handleNextClick('pageThree')
  }
  const handleNextClick = (param: string) => {
    return setPageCount(param)
  }

  return (
    <div className='w-[516px] justify-center pb-[90px] pt-[70px]'>
      {/**wrap */}
      <div
        className={`h-[800px] rounded-[32px] bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
      >
        <div>
          <p className='pt-[106px] text-center text-xl font-bold text-white'>
            MBTI를 입력해주세요!
          </p>
        </div>
        <div className='pt-[37px]'>
          <div className='mb-4 flex flex-row justify-center'>
            {' '}
            <span className='mr-2 text-2xl font-bold'>E</span>
            <label className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'>
              <input
                type='checkbox'
                id='checkEI'
                className='peer sr-only'
                checked={EI}
                onChange={(e) => setEI(e.target.checked)}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  EI === false ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {EI === false ? (
                  <Image src={left} alt='왼쪽' width={12} height={12} />
                ) : null}
                {EI === true ? (
                  <Image src={right} alt='오른쪽' width={12} height={12} />
                ) : null}
              </span>
            </label>{' '}
            <span className='ml-2 text-2xl font-bold'>I</span>
          </div>
          {/** */}
          <div className='mb-4 flex flex-row justify-center'>
            {' '}
            <span className='mr-2 text-2xl font-bold'>N</span>
            <label className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'>
              <input
                type='checkbox'
                id='checkSN'
                className='peer sr-only'
                checked={SN}
                onChange={(e) => setSN(e.target.checked)}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  SN === false ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {SN === false ? (
                  <Image src={left} alt='왼쪽' width={12} height={12} />
                ) : null}
                {SN === true ? (
                  <Image src={right} alt='오른쪽' width={12} height={12} />
                ) : null}
              </span>
            </label>{' '}
            <span className='ml-2 text-2xl font-bold'>S</span>
          </div>
          {/** */}
          <div className='mb-4 flex flex-row justify-center'>
            <span className='mr-2 text-2xl font-bold'>F</span>
            <label
              htmlFor='checkTF'
              className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'
            >
              <input
                type='checkbox'
                id='checkTF'
                className='peer sr-only'
                checked={TF}
                onChange={(e) => setTF(e.target.checked)}
              />
              <span
                className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                  TF === false ? 'right-auto bg-white' : 'right-1 bg-white'
                } flex items-center justify-center`}
              >
                {TF === false ? (
                  <Image src={left} alt='왼쪽' width={12} height={12} />
                ) : null}
                {TF === true ? (
                  <Image src={right} alt='오른쪽' width={12} height={12} />
                ) : null}
              </span>
            </label>
            <span className='ml-2 text-2xl font-bold'>T</span>
          </div>
        </div>
        {/* */}
        <div className='mb-4 flex flex-row justify-center'>
          <span className='mr-2 text-2xl font-bold'>J</span>
          <label
            htmlFor='checkPJ'
            className='relative mb-4 h-6 w-20 rounded-[148.50px] border-2 bg-indigo-500 p-[3px] shadow shadow-inner'
          >
            <input
              type='checkbox'
              id='checkPJ'
              className='peer sr-only'
              checked={PJ}
              onChange={(e) => setPJ(e.target.checked)}
            />
            <span
              className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-blue-700 transition-all duration-500 ${
                PJ === false ? 'right-auto bg-white' : 'right-1 bg-white'
              } flex items-center justify-center`}
            >
              {PJ === false ? (
                <Image src={left} alt='왼쪽' width={12} height={12} />
              ) : null}
              {PJ === true ? (
                <Image src={right} alt='오른쪽' width={12} height={12} />
              ) : null}
            </span>
          </label>
          <span className='ml-2 text-2xl font-bold'>P</span>
        </div>
        {/**입력한 MBTI 표시 */}
        <div className='flex justify-center gap-2 pt-[58px]'>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {EI ? 'I' : 'E'}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {SN ? 'S' : 'N'}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {TF ? 'T' : 'F'}
          </p>
          <p
            className={`${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} h-[88px] w-[72px] rounded-xl bg-white  bg-opacity-10 pt-[8px] text-center text-7xl  font-bold `}
          >
            {PJ ? 'P' : 'J'}
          </p>
        </div>
        {/**입력한 MBTI 표시 */}
        {/**버튼 */}
        <div className='flex justify-center gap-4  pt-[70px]'>
          <PreviousButton onClick={() => handleNextClick('pageOne')}>
            이전
          </PreviousButton>
          <ButtonPrimary onClick={onsubmitResultHandler}>
            결과보러가기
          </ButtonPrimary>
        </div>{' '}
        {/**버튼 */}
      </div>
      {/**wrap */}
    </div>
  )
}

export default PersonalSubTest
