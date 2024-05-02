import { useRef, useEffect } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import React from 'react'
import {
  useDisLikeQuery,
  usePreferenceQuery,
} from '@/query/personal/useQueryPersonal'

import type { ResultChartProps } from '@/types/personal/type'

const ResultChart: React.FC<ResultChartProps> = ({ userChar }) => {
  //똑같이 입력한 mbti를 불러온다.
  const mbtiStatus = userChar.mbti

  //차트를 그리기위한 준비
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  //mbti별 선호도 & 비선호도
  const preference = usePreferenceQuery(mbtiStatus)
  const dislike = useDisLikeQuery(mbtiStatus)

  useEffect(() => {
    if (preference && dislike) {
      //차트에 쓸 라벨과 데이터 값으로 필요한 부분만 추출
      const labels = Object.keys(preference) // 장르
      const preferenceData = Object.values(preference) //장르별 선호도 데이터
      const dislikeData = Object.values(dislike) //장르별 비선호도 데이터

      if (chartRef.current) {
        if (chartInstance.current) {
          //이전에 만든 차트가 있다면
          chartInstance.current.destroy() //해당 차트를 지운다
        }

        //캔버스를 그림
        const context = chartRef.current.getContext('2d')

        if (context) {
          const newChart = new Chart(context, {
            type: 'radar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: '장르별 음악 선호도',
                  data: preferenceData,
                  borderColor: 'green',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(56, 238, 65)',
                  pointBorderColor: '#fff',
                },
                {
                  label: '장르별 음악 비선호도',
                  data: dislikeData,
                  borderColor: 'red',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(255, 64, 64)',
                  pointBorderColor: '#fff',
                },
              ],
            },
            //차트의 글자 색, 글자 크기 등 커스텀하는 부분
            options: {
              scales: {
                //오각형 차트의 색
                r: {
                  angleLines: {
                    color: 'white',
                  },
                  grid: {
                    color: 'white',
                  },
                  pointLabels: {
                    color: 'white',
                    font: {
                      size: 15,
                    },
                  },
                  ticks: {
                    //차트의 수치 색
                    color: 'blue',
                  },
                },
              },
              responsive: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14,
                    },
                    color: 'white',
                  },
                },
                title: {
                  display: true,
                  text: '당신의 퍼스널 뮤직 진단 결과',
                  color: 'white',
                  font: {
                    size: 20,
                  },
                },
              },
            },
          } as ChartConfiguration)
          chartInstance.current = newChart
        }
      }
    } //차트의 값이 변경될 때마다 다시 그려주기 위한 의존성 배열
  }, [preference, dislike, chartRef.current])

  return (
    <div className=' flex justify-center pt-[15px]'>
      <canvas
        ref={chartRef}
        width={400}
        height={300}
        style={{ backgroundColor: 'black' }}
      />
    </div>
  )
}

export default ResultChart
