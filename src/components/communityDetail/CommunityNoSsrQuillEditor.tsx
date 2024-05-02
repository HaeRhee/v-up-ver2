// // 다이나믹 임포트: 번들 크기를 줄이고 초기 로드 속도를 개선하기 위해 필요한 컴포넌트를 동적으로 로드하는 방법
import dynamic from 'next/dynamic'
import Image from 'next/image'
import loading from '@/../public/images/loadingBar.gif'

// 커뮤니티 상세페이지 등록 - 퀼 에디터
// SSR을 비활성화하고, 로딩 중에 표시될 컴포넌트 및 로딩 중에 SSR 여부를 설정
export const CommunityNoSsrQuillEditor = dynamic(
  async () => {
    // 필요한 컴포넌트(CSR환경이 필요한 라이브러리를 포함한 컴포넌트)
    // 비동기적으로 임포트
    const { default: RQ } = await import('./CommunityQuillEditor')
    // 컴포넌트를 반환
    const comp = ({ forwardedRef, ...props }: any) => {
      return <RQ ref={forwardedRef} {...props} />
    }
    return comp
  },
  {
    // SSR 비활성화
    ssr: false,
    // 로딩 중에 표시될 컴포넌트를 설정
    loading: () => {
      return (
        <div>
          <Image src={loading} width={50} height={50} alt='로딩바' />
        </div>
      )
    },
  },
)
