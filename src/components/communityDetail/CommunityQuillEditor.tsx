'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css' // Quill 에디터 스타일 시트
import { Quill } from 'react-quill'
import { formats, toolbarOptions } from './value' // formats와 toolbarOptions 임포트
import { QuillNoSSRWrapper } from './QuillEditor' // Quill 에디터 dynamic동적 컴포넌트

type QuillEditorProps = {
  content: string // 에디터 내용
  setCommunityForm: Dispatch<
    SetStateAction<{ boardTitle: string; content: string }>
  >
}

const CommunityQuillEditor = ({
  content,
  setCommunityForm,
}: QuillEditorProps) => {
  // 이미지 핸들러
  // const onImageHandler = () => {
  //   if (typeof window !== 'undefined') {
  //     const input = document.createElement('input')
  //     input.setAttribute('type', 'file')
  //     input.setAttribute('accept', 'image/*')
  //     input.click()
  // input.addEventListener('change', async () => {
  // const file = input?.files[0]
  // try {
  // const res = await supabase.({ img: file })
  //     const imgUrl = res?.data.imgUrl
  //     const editor = quillRef?.current?.getEditor()
  //     const range = editor.getSelection()
  //     editor.insertEmbed(range.index, 'image', imgUrl)
  //     editor.setSelection(range.index + 1)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
  //   }
  // }
  // Quill 모듈 설정 useMemo 훅을 사용하여 성능 최적화
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions, // 툴바 옵션 설정
        ImageResize: {
          parchment: Quill.import('parchment'), // 이미지 리사이즈 모듈 임포트
        },
      },
    }),
    [content], // content가 변경될 때만 실행
  )

  const onEditorChangeHandler = (value: string) => {
    setCommunityForm((prevData) => ({
      ...prevData,
      content: value,
    }))
  }
  // 기준이 될 Quill 에디터 렌더링
  return (
    <div>
      <QuillNoSSRWrapper
        value={content}
        onChange={onEditorChangeHandler} // 내용 변경 핸들러
        modules={modules} // 모듈 설정
        formats={formats} // 포맷 설정 - 확장된 기능들 종류 설정
        placeholder='추천할 음악에 대해 얘기해 주세요.(200자 이내)'
        className='rounded-[12px] text-white [&_.ql-container.ql-snow]:rounded-[12px] [&_.ql-container.ql-snow]:border-[#ffffff1a] [&_.ql-editor.ql-blank::before]:text-[16px] [&_.ql-editor.ql-blank::before]:not-italic [&_.ql-editor.ql-blank::before]:text-[#ffffff5a] [&_.ql-editor.ql-blank]:text-white [&_.ql-editor]:h-[200px] [&_.ql-editor]:rounded-[12px] [&_.ql-editor]:bg-[#ffffff1a] [&_.ql-toolbar.ql-snow]:rounded-[12px] [&_.ql-toolbar.ql-snow]:border-[#ffffff1a] [&_quill]:rounded-[12px] '
      />
    </div>
  )
}

export default CommunityQuillEditor
