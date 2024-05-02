'use client'

import React, { FormEvent, useRef, useState } from 'react'
import { updateUserPassword } from '@/shared/login/loginApi'
import { useRouter } from 'next/navigation'
import {
  DOWN_ACTIVE_BUTTON,
  DROP_SHADOW,
  INPUT_FOCUS,
  INPUT_SHADOW,
  OPEN_ANOTHER_SHADOW,
} from '../login/loginCss'
import { ACTIVE_BUTTON_SHADOW } from '../login/buttonCss'
import Swal from 'sweetalert2'
import { validateDetailPw } from '../join/value'

const FindPassword = () => {
  const refNewPassword = useRef<HTMLInputElement>(null)
  const [newPassword, setNewPassword] = useState<string>('')
  const [updateState, setUpdateState] = useState<boolean>(false)
  const blankPattern = /[\s]/g
  const router = useRouter()

  const findPassword = async (e: FormEvent) => {
    e.preventDefault()

    if (!newPassword) {
      alert('비밀번호를 입력해주세요!')
      return
    }

    if (blankPattern.test(newPassword) == true) {
      alert('비밀번호에 공백은 사용할 수 없습니다.')
      return
    }

    if (!validateDetailPw.test(newPassword)) {
      await Swal.fire({
        text: '비밀번호는 6자 이상, 숫자, 소문자를 모두 포함해야 합니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#685BFF',
        color: '#ffffff',
        background: '#2B2B2B',
      })
      refNewPassword.current?.focus()
      return
    }

    try {
      if (newPassword) {
        const data = await updateUserPassword(newPassword)
        setNewPassword('')

        if (data) {
          await Swal.fire({
            text: '비밀번호를 변경했습니다!',
            confirmButtonText: '확인',
            confirmButtonColor: '#685BFF',
            color: '#ffffff',
            background: '#2B2B2B',
          })
          setUpdateState(true)
          router.push('/login')
        }
      }
    } catch (error) {
      alert('오류로 인해 비밀번호 변경이 되지 않았습니다. 문의해주세요')
      return
    }
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div
        className={`flex h-[680px] w-[516px] flex-col items-center justify-center gap-[94px] rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] pb-[300px] ${OPEN_ANOTHER_SHADOW} `}
      >
        <form onSubmit={findPassword}>
          <div className='z-1500 flex flex-col gap-[32px] text-white'>
            <div className='flex flex-col gap-[94px]'>
              <h3 className='flex justify-center pt-[106px] text-[20px] font-bold'>
                <p>비밀번호&nbsp;찾기</p>
              </h3>
              <div className='flex flex-col gap-[4px]'>
                <label
                  htmlFor='password'
                  className='text-[rgba(255,255,255,0.3)]'
                >
                  새&nbsp;비밀번호
                </label>
                <input
                  autoFocus
                  id='password'
                  type='password'
                  value={newPassword}
                  ref={refNewPassword}
                  onFocus={() => setUpdateState(false)}
                  placeholder='새 비밀번호를 입력해 주세요.'
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] text-[16px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                />
                <div>
                  {!validateDetailPw.test(newPassword) &&
                  newPassword?.length > 0 ? (
                    <p className='w-[320px] text-primary'>
                      비밀번호는 6자 이상, 숫자, 소문자를 모두 포함해야 합니다.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <button
              className={`flex h-[48px] w-[320px] items-center justify-center  rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
            >
              {updateState ? '변경완료!' : '변경'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FindPassword
