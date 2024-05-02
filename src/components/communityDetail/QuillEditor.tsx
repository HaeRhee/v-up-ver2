// 기준이 되는 퀼 에디터 import 환경 설정
import dynamic from 'next/dynamic'
import Image from 'next/image'
import loading from '@/../public/images/loadingBar.gif'

import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Quill 에디터 스타일 시트 가져오기

// ReactQuillProps를 확장한 ForwardedQuillComponent 인터페이스 정의
interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>
}

export const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill')
    // Quill 컴포넌트 정의
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    )
    return Quill // 동적으로 불러온 Quill 컴포넌트 반환
  },
  {
    loading: () => (
      <div>
        <Image src={loading} width={50} height={50} alt='로딩바' />
      </div>
    ),
    ssr: false, // SSR 비활성화 설정
  },
)
