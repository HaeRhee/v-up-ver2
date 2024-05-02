'use client'

import PersonalModalDetail from '@/components/personal/PersonalModalDetail'
import { useState, useEffect } from 'react'

const PersonalModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  {
    /**현재 오늘은 그만보기 기능은 유저가 아닌 브라우저(로컬스토리지)로 관리하고 있습니다! */
  }
  //사용자가 브라우저를 방분했을 때 HOME_VISITED가 있으면 가져오고 없다면 null
  const HOME_VISITED =
    typeof window !== 'undefined' ? localStorage.getItem('homeVisited') : null

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const today = new Date() //현재 시점의 날짜
    const visitedDate = HOME_VISITED ?? null // 내가 방문했을 때의 날짜

    const handleMainPop = () => {
      //이미 방문했고, 방문한 날짜가 현재 날짜보다 크다면 모달을 열지 않는다. (하루가 지나지 않았으니)
      if (visitedDate && visitedDate > today.getTime().toString()) {
        return
      }
      //방문 날짜가 없거나, 방문한 날짜가 현재 날짜보다 작다면 모달을 연다.
      if (!visitedDate || visitedDate < today.getTime().toString()) {
        setIsModalOpen(true)
      }
    }

    //사용자가 방문하면 1초 후에 모달을 여는 함수를 실행한다.
    window.setTimeout(handleMainPop, 1000)
  }, [HOME_VISITED])

  return <PersonalModalDetail isOpen={isModalOpen} onClose={closeModal} />
}
export default PersonalModal
