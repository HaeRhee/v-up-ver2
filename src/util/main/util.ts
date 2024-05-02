//장르명별 코드 값 뽑기
export const genreMatch = (genre: string) => {
  let genreCode
  switch (genre) {
    case 'hiphop':
      genreCode = 0
      break
    case 'dance':
      genreCode = 1
      break
    case 'ballad':
      genreCode = 2
      break
    case 'rnb':
      genreCode = 3
      break
    case 'rock':
      genreCode = 4
      break
    default:
      genreCode = 0
      break
  }
  return genreCode
}
