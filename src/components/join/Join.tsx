'use client'

import { FormEvent, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { validateFormBlank } from '@/query/communityDetail/mutation'
import { saveSignUpInUserInfo, signUp } from '@/shared/join/joinApi'
import {
  DOWN_ACTIVE_BUTTON,
  DROP_SHADOW,
  INPUT_FOCUS,
  INPUT_SHADOW,
  OPEN_ANOTHER_SHADOW,
} from '../login/loginCss'
import check from '@/../public/images/check-box.svg'
import allowCheck from '@/../public/images/allow-check-box.svg'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import AllowUserInfo from './AllowUserInfo'
import useInput from '@/hooks/useInput'
import Swal from 'sweetalert2'
// 비밀번호와 이메일 유효성을 검사하는 정규식
import { blankPattern, validateDetailPw, validateEmail } from './value'

const Join = () => {
  const refPassword = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const joinState = {
    userEmail: '',
    userPw: '',
    userPwCheck: '',
    userNickname: '',
    checkAgree: false,
  }
  // 회원가입 입력 내용
  const {
    form: join,
    setForm: setJoin,
    onChange: onChangeHandler,
    reset,
  } = useInput(joinState)

  const { userEmail, userPw, userPwCheck, userNickname, checkAgree } = join

  // 약관 동의, 비밀번호 등 유효성 검사
  const validateCheckAgree = checkAgree
  const validatePassword = !(userPw === userPwCheck)
  const validateEmptyValue = !(userEmail || userPwCheck || userNickname)

  // 체크박스 클릭 핸들러
  const onClickCheckboxHandler = () => {
    setJoin((prevForm) => ({ ...prevForm, checkAgree: !prevForm.checkAgree }))
  }

  // 회원가입 핸들러
  const onJoinHandler = async (e: FormEvent) => {
    e.preventDefault()

    // 이메일과 비밀번호에 공백을 확인
    const { firstBlank: userEmailBlank, secondBlank: userPwBlank } =
      validateFormBlank(userEmail, userPw)

    // 비밀번호에 공백이 있는 경우 유효성
    if (
      blankPattern.test(userPw) == true ||
      blankPattern.test(userPwCheck) == true
    ) {
      await Swal.fire({
        text: '비밀번호에 공백은 사용할 수 없습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }
    // 빈칸이 있는지 확인 유효성
    if (validateEmptyValue || userEmailBlank === '') {
      await Swal.fire({
        text: '빈칸 없이 작성해 주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    // 비밀번호의 형식을 유효성 검사
    if (!validateDetailPw.test(userPw)) {
      await Swal.fire({
        text: '비밀번호는 6자 이상, 숫자, 소문자를 모두 포함해야 합니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      refPassword.current?.focus()
      return
    }

    // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
    if (validatePassword || userPwBlank === '') {
      await Swal.fire({
        text: '비밀번호를 다시 입력해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    // 약관 동의 여부를 확인
    if (validateCheckAgree === false) {
      await Swal.fire({
        text: '약관 동의는 필수입니다',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    // 회원가입 api
    let { data, error } = await signUp({
      email: userEmail,
      password: userPw,
    })

    const userId = data?.user?.id

    if (userId) {
      await saveSignUpInUserInfo({
        userId,
        email: userEmail,
        password: userPw,
        nickname: userNickname,
        userType: 0,
      })

      await Swal.fire({
        text: 'V-UP에 가입되셨습니다',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      router.push('/login')
    }

    if (data) {
      // 데이터가 없을 때 에러 핸들링
      if (
        data?.user?.identities?.length === 0 ||
        (error && error.status === 422)
      ) {
        await Swal.fire({
          text: '이미 존재하는 이메일입니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })
        return
      }

      // 에러 핸들링
      if (error) {
        const errorStatus = error.status
        if (errorStatus === 400) {
          await Swal.fire({
            text: '올바른 이메일 형식이 아닙니다. 다시 입력해주세요.',
            confirmButtonText: '확인',
            confirmButtonColor: '#685BFF',
            color: '#ffffff',
            background: '#2B2B2B',
          })
        }

        if (error.message === 'Email rate limit exceeded') {
          await Swal.fire({
            text: '잠시 후에 다시 시도 해주세요.',
            confirmButtonText: '확인',
            confirmButtonColor: '#685BFF',
            color: '#ffffff',
            background: '#2B2B2B',
          })
          return
        }
      }
    }

    reset()
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div
        className={`flex w-[516px] flex-col items-center justify-center gap-[94px] rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] pb-[16px] ${OPEN_ANOTHER_SHADOW} `}
      >
        <form className='flex w-[320px] flex-col gap-[32px]'>
          <div className='z-1500 flex flex-col gap-[32px] text-white'>
            <div className='flex flex-col gap-[40px]'>
              <h3 className='flex justify-center pt-[106px] text-[24px] font-bold'>
                <p>회원가입</p>
              </h3>
              <div className='flex flex-col gap-[16px] [&_label]:gap-[4px] [&_label]:text-[rgba(255,255,255,0.3)]'>
                <label htmlFor='password' className='flex flex-col '>
                  <p>이메일</p>
                  <input
                    autoFocus
                    type='email'
                    name='userEmail'
                    value={userEmail}
                    placeholder='이메일'
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>
                <div>
                  {!validateEmail.test(userEmail) && userEmail?.length > 0 ? (
                    <p className='text-primary'>
                      올바른 이메일 형식이 아닙니다. @와 .을 포함하여 작성해
                      주세요.
                    </p>
                  ) : null}
                </div>

                <label htmlFor='password' className='flex flex-col'>
                  <p>비밀번호</p>
                  <input
                    type='password'
                    name='userPw'
                    value={userPw}
                    ref={refPassword}
                    maxLength={12}
                    placeholder='비밀번호'
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>

                <div>
                  {!validateDetailPw.test(userPw) && userPw?.length > 0 ? (
                    <p className='text-primary'>
                      비밀번호는 6자 이상, 숫자, 소문자를 모두 포함해야 합니다.
                    </p>
                  ) : null}
                </div>

                <label className='flex flex-col '>
                  <p>비밀번호 확인</p>
                  <input
                    type='password'
                    name='userPwCheck'
                    maxLength={12}
                    placeholder='비밀번호 확인'
                    value={userPwCheck}
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>
                <div>
                  {validatePassword && userPwCheck?.length > 0 ? (
                    <p className='text-primary'>
                      비밀번호를 다시 입력해주세요.
                    </p>
                  ) : null}
                </div>
                <label className='flex flex-col '>
                  <p>닉네임</p>
                  <input
                    type='text'
                    name='userNickname'
                    maxLength={10}
                    placeholder='닉네임을 적어주세요(10자 이내)'
                    value={userNickname}
                    onChange={onChangeHandler}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] text-[16px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                </label>
                <div>
                  <label
                    htmlFor='checkAgree'
                    className='flex gap-[12px]'
                    onClick={onClickCheckboxHandler}
                  >
                    <Image
                      src={checkAgree ? allowCheck : check}
                      alt='체크박스 이미지'
                      width={20}
                      height={20}
                      id='checkAgree'
                    />
                    <p className='flex items-center'>
                      <span
                        className={`${checkAgree ? 'text-primary' : 'text-[rgba(255,255,255,0.4)]'}`}
                      >
                        가입 동의 약관&#40;필수&#41;
                      </span>
                    </p>
                    <div>
                      <input
                        type='checkbox'
                        name='checkAgree'
                        checked={checkAgree}
                        onChange={() => {}}
                        className='hidden'
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <AllowUserInfo />
                </div>
              </div>
            </div>
            <div className='tracking-[-0.03em]'>
              <button
                onClick={onJoinHandler}
                className={` flex h-[48px] w-[320px] items-center justify-center  rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
              >
                다음
              </button>
            </div>
          </div>
          <div>
            <div className='flex justify-center gap-[8px] text-[rgba(255,255,255,0.5)]'>
              <p>이미 계정이 있으신가요?</p>
              <Link
                href={'/login'}
                className='leading-[1.4rem] text-primary underline '
              >
                로그인하기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Join
