'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Modal from '@/util/Modal'
import useInput from '@/hooks/useInput'
import { findUserPassword } from '@/shared/login/loginApi'
import {
  DROP_SHADOW,
  SHADOW,
  INPUT_SHADOW,
  INPUT_FOCUS,
  DOWN_ACTIVE_BUTTON,
  OPEN_ANOTHER_SHADOW,
} from './loginCss'
import { ACTIVE_BUTTON_SHADOW } from './buttonCss'
import findPwImg from '@/../public/images/findPassword.svg'
import close from '@/../public/images/close-button.svg'
import loadingBar from '@/../public/images/loadingBar.gif'
import Swal from 'sweetalert2'
import { blankPattern, validateEmail } from '../join/value'

const Login = () => {
  const router = useRouter()
  const refEmail = useRef<HTMLInputElement>(null)
  const { data: userSessionInfo, status } = useSession()
  const uid = userSessionInfo?.user?.uid as string

  // 중복 클릭 방지를 위한 상태를 설정
  const [removeDouble, setRemoveDouble] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [spendEmail, setSpendEmail] = useState<string>('')

  // 이메일 전송 여부를 관리
  const [submitEmail, setSubmitEmail] = useState<boolean>(false)
  const needLoginInfo = { email: '', password: '' }

  // 로그인 입력 정보
  const { form: userlogin, onChange: onChangeHandler } = useInput(needLoginInfo)
  const { email, password } = userlogin
  const sendPasswordText = submitEmail ? '전송완료!' : '전송'

  const openModal = (e: FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
    setSubmitEmail(submitEmail)
  }
  const closeModal = () => {
    setSubmitEmail(false)
    setIsModalOpen(false)
  }

  // 로그인하는 함수
  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (removeDouble) return

    setRemoveDouble(true)
    // 비밀번호에 공백이 있는지 확인
    if (blankPattern.test(password) == true) {
      setRemoveDouble(false)
      await Swal.fire({
        title: '비밀번호에 공백은 사용할 수 없습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    // 이메일 형식이 올바른지 확인
    if (!validateEmail.test(email) && email.length > 0) {
      setRemoveDouble(false)

      await Swal.fire({
        text: '올바른 이메일 형식이 아닙니다. 다시 작성해 주세요',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }
    // 이메일과 비밀번호를 사용한 로그인
    const signResult = await signIn('email-password-credential', {
      email,
      password,
      redirect: false,
    })

    // 로그인에 성공한 경우 환영 메시지를 띄우고 메인으로
    if (signResult && signResult.ok === true) {
      await Swal.fire({
        title: 'V-UP에 오신 걸 환영합니다!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      router.push('/')
    }

    // 로그인에 실패한 경우 에러 메시지
    if (signResult && signResult.error) {
      await Swal.fire({
        text: `${signResult.error}`,
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
    }
    setRemoveDouble(false)
  }

  // 비밀번호 찾기 함수
  const findPassword = async (e: FormEvent) => {
    e.preventDefault()

    // 이메일이 입력되지 않은 경우
    if (!spendEmail) {
      await Swal.fire({
        text: '이메일을 입력해주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      return
    }

    if (spendEmail) {
      // 비밀번호 재설정 이메일을 전송
      const { error } = await findUserPassword(spendEmail)
      setSpendEmail('')

      if (!error) {
        await Swal.fire({
          text: '비밀번호를 복구하는 이메일을 보냈습니다!',
          confirmButtonText: '확인',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })
        return setSubmitEmail(true)
      }

      // 에러핸들링
      if (error && error.status === 400) {
        const errorStatus = error.status
        if (errorStatus === 400) {
          await Swal.fire({
            text: '올바르지 않은 이메일 형식 입니다.',
            confirmButtonText: '확인',
            confirmButtonColor: '#685BFF',
            color: '#ffffff',
            background: '#2B2B2B',
          })
          return
        }

        if (errorStatus === 429) {
          await Swal.fire({
            text: '1분 뒤에 다시 시도해 주세요.',
            confirmButtonText: '확인',
            confirmButtonColor: '#685BFF',
            color: '#ffffff',
            background: '#2B2B2B',
          })
          return setSubmitEmail(false)
        }
      }

      if (error && error.status === 429) {
        await Swal.fire({
          text: '잠시 후 1분 뒤에 다시 시도해주세요!',
          confirmButtonText: '확인',
          confirmButtonColor: '#685BFF',
          color: '#ffffff',
          background: '#2B2B2B',
        })
        setSubmitEmail(true)
      }
    }
  }

  // 로그인 상태이면 메인으로 리다이렉션,
  // 혹여 로그인 유저가 로그인 페이지를 강제로 가려는 경우 대비
  useEffect(() => {
    if (uid) {
      return router.replace('/')
    }
  }, [uid])

  if (status === 'loading') {
    return (
      <div className='absolute h-screen w-[full] text-white '>
        <Image src={loadingBar} width={50} height={50} alt='로딩바' />
      </div>
    )
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center  '>
      {isModalOpen && (
        <div className='z-1000 absolute inset-0 bg-black opacity-50'></div>
      )}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <button
            onClick={closeModal}
            className='absolute right-[32px] top-[32px] m-3'
          >
            <Image src={close} width={24} height={24} alt='닫기 아이콘' />
          </button>
          <div
            className={`flex h-[680px] w-[516px] flex-col items-center justify-center gap-[94px] rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] pb-[300px] ${OPEN_ANOTHER_SHADOW} `}
          >
            <h3 className='pt-[106px] text-[20px] font-bold'>
              <p>비밀번호&nbsp;찾기</p>
            </h3>
            <div className=' flex flex-col gap-[28px]'>
              <article>
                <label className='flex flex-col gap-[4px] text-[rgba(255,255,255,0.3)]'>
                  <p>이메일</p>
                  <input
                    type='email'
                    autoFocus
                    ref={refEmail}
                    onFocus={() => setSubmitEmail(false)}
                    value={spendEmail}
                    placeholder='가입 시 사용한 이메일을 입력하세요.'
                    onChange={(e) => setSpendEmail(e.target.value)}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                  />
                  <div className='mt-[4px]'>
                    {!validateEmail.test(spendEmail) &&
                    spendEmail?.length > 0 ? (
                      <p className='w-[320px] text-primary'>
                        올바른 이메일 형식이 아닙니다. @와 .을 포함하여 작성해
                        주세요.
                      </p>
                    ) : null}
                  </div>
                </label>
              </article>
              <div>
                <button
                  onClick={findPassword}
                  className={`flex h-[48px] w-[320px] items-center justify-center rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
                >
                  {sendPasswordText}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={`border-gray-300 flex w-[516px] flex-col items-center justify-center overflow-scroll rounded-2xl border-none border-opacity-10 bg-white bg-opacity-10 pb-[16px] pt-[106px]  ${SHADOW}`}
      >
        <section className='tracking-[-0.03em]'>
          <div className='text-center text-[24px] font-bold'>
            <p>V-UP에&nbsp;오신&nbsp;걸&nbsp;환영합니다</p>
          </div>
          <div className='pt-[88px] '>
            <form
              onSubmit={onLoginHandler}
              className='flex w-[320px] flex-col gap-[32px]'
            >
              <div className='flex flex-col gap-[16px] text-[rgba(255,255,255,0.3)] [&_label]:gap-[4px]'>
                <div>
                  <label className='flex flex-col '>
                    <p>이메일</p>
                    <input
                      autoFocus
                      type='text'
                      name='email'
                      value={email}
                      onChange={onChangeHandler}
                      placeholder='이메일을 입력하세요'
                      className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                    />
                  </label>
                </div>
                <div>
                  <label className='flex flex-col '>
                    <p>비밀번호</p>
                    <input
                      type='password'
                      name='password'
                      value={password}
                      maxLength={12}
                      onChange={onChangeHandler}
                      placeholder='비밀번호를 입력하세요'
                      className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                    />
                  </label>
                </div>
              </div>
              <div className='tracking-[-0.03em]'>
                <button
                  type='submit'
                  className={` flex h-[48px] w-[320px] items-center justify-center  rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>

          <article className='flex flex-col gap-[60px] tracking-[-0.03em] text-[rgba(255,255,255,0.3)]'>
            <div className='flex justify-end pt-[16px]'>
              <button
                onClick={openModal}
                className='w-101 flex items-center justify-center gap-[2px] text-[14px] text-[rgba(255,255,255,0.5)]'
              >
                비밀번호&nbsp;찾기
              </button>
              <Image
                src={findPwImg}
                width={20}
                height={20}
                alt='오른쪽방향화살표'
              ></Image>
            </div>
            <section className='flex flex-col items-center gap-[68px] text-[14px]'>
              {/* <div className='flex flex-col gap-[16px] font-bold tracking-[-0.03em] text-[rgba(255,255,255,0.5)]'>
                <p>SNS로&nbsp;간편하게&nbsp;시작하기</p>
                <div>
                  <SocialLogin />
                </div>
              </div> */}
              <div className='flex gap-[8px]'>
                <p>아직&nbsp;회원이&nbsp;아니신가요?</p>
                <Link
                  href={'/join'}
                  className='leading-[1.4rem] text-primary underline '
                >
                  <p>회원가입&nbsp;하기</p>
                </Link>
              </div>
            </section>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Login
