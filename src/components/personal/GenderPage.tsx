'use client'
import { useState } from 'react'
import { useSurvey } from '@/shared/store/personalStore'
import { useRouter } from 'next/navigation'
import ButtonPrimary from '../../util/ButtonPrimary'
import PreviousButton from '../mypage/PreviousButton'
import { OPEN_ANOTHER_SHADOW } from '../login/loginCss'
import Swal from 'sweetalert2'

const GenderPage = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [gender, setGender] = useState<string>('')
  const router = useRouter()

  //성별을 다음 컴포넌트로 넘겨주기 위해 zustand로 관리
  // zustand에 성별을 저장할 addGender 함수
  const { addGender } = useSurvey()

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender)
  }

  const handleNextClick = (param: string) => {
    //pageTwo라는 인자를 전달해 다음 컴포넌트로 이동
    if (!gender) {
      // alert('성별을 선택해주세요.')
      Swal.fire({
        icon: 'error',
        title: '성별을 선택해주세요.',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    addGender(gender)
    setPageCount(param)
  }

  return (
    <div className='w-[516px] pb-[90px] pt-[70px]'>
      <div
        className={`h-[800px] rounded-[32px] bg-white bg-opacity-10 ${OPEN_ANOTHER_SHADOW}`}
      >
        <div>
          <p className='pt-[106px] text-center text-xl font-bold'>
            성별을 선택해주세요
          </p>
        </div>
        <div className='flex flex-col gap-3 pt-[40px]'>
          <div className='flex justify-center'>
            <label>
              <input
                type='radio'
                name='gender'
                id='male'
                value='male'
                checked={gender === 'male'}
                onChange={() => handleGenderChange('male')}
                className='peer hidden'
              />
              <p
                className={`inline-flex h-[100px] w-[336px] items-center 
              justify-center rounded-xl  ${OPEN_ANOTHER_SHADOW}
              bg-white bg-opacity-20  text-lg font-bold peer-checked:bg-primary `}
              >
                남성
              </p>
            </label>
          </div>
          <div className='flex justify-center'>
            <label>
              <input
                type='radio'
                name='gender'
                id='female'
                value='female'
                checked={gender === 'female'}
                onChange={() => handleGenderChange('female')}
                className='peer hidden'
              />
              <p
                className={`inline-flex h-[100px] w-[336px] items-center 
              justify-center rounded-xl  ${OPEN_ANOTHER_SHADOW}
              bg-white bg-opacity-20  text-lg font-bold peer-checked:bg-primary `}
              >
                여성
              </p>
            </label>
          </div>
        </div>
        <div className='flex justify-center gap-3 pt-[208px]'>
          <PreviousButton onClick={() => router.back()}>이전</PreviousButton>
          <ButtonPrimary onClick={() => handleNextClick('pageTwo')}>
            다음
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export default GenderPage
