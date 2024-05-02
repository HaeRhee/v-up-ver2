'use client'

import { useState } from 'react'
import GenderPage from '@/components/personal/GenderPage'
import MBTIPage from '@/components/personal/MBTIPage'
import ResultPage from '@/components/personal/ResultPage'
const PersonalMusicPage = () => {
  const [pageCount, setPageCount] = useState<string>('pageOne')
  return (
    <>
      {/**url이동없이 컴포넌트 이동 */}
      <div className='flex justify-center'>
        {pageCount === 'pageOne' ? ( //처음에는 성별 체크 페이지로 이동한다.
          <GenderPage setPageCount={setPageCount} />
        ) : pageCount === 'pageTwo' ? (
          <MBTIPage setPageCount={setPageCount} />
        ) : pageCount === 'pageThree' ? (
          <ResultPage setPageCount={setPageCount} />
        ) : (
          <div>Error</div>
        )}
      </div>
    </>
  )
}

export default PersonalMusicPage
