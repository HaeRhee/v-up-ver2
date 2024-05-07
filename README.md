## <img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/fc11bb48-13c3-41a8-a344-3979391a1cd7" witdh="300px" height="150px" />

### < 목차 >


**# 프로젝트 팀 "V-UP(Volume Up)"소개**

- 팀원소개

<br />

**# 프로젝트 소개**

- 개발 기간 & 프로젝트 명 & 소개 & 목표 & 프로젝트 Rule

<br />

**# 시작가이드**

- Installation
  
<br />

**# 와이어프레임**

**# 프로젝트 화면 구성 및 기능**

**# 트러블슈팅**

**# 파일구조**




<br />

## 프로젝트 팀 "VVV(VakVakVerse)" 소개
**퍼스널 뮤직 검사를 통해 나의 취향에 맞는 음악을 추천받고 음악을 들으며 음악 커뮤니티를 즐길 수 있는 서비스 입니다.**

<br />

**팀원 소개**

---

|                   성예지                   |                 강지수                 |                     남해리                     |                   서가희                   |       전주용       |
| :----------------------------------------: | :------------------------------------: | :--------------------------------------------: | :----------------------------------------: | :----------------: |
|                    ISTP                    |                  ISFP                  |                   ENFJ/ISTJ                    |                    ESTP                    |        ENFJ        |
|                 <p><img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/6282726f-81ff-4c6f-a0a5-7de4d31cc9a6" witdh="300px" height="150px" /></p>         |               <p><img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/6ccd4aec-97af-4c33-bd11-a9e64472313e" witdh="300px" height="150px" /></p>                |                   <p><img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/6f9b5eb2-bbb1-41ff-ab00-e4bb21abd7c1" witdh="300px" height="150px" /></p>                 |              <p><img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/9b00a3e6-1f67-43a1-8502-72730fe3c012" witdh="300px" height="150px" /></p>                  |      <p><img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/4d524727-f55a-4b67-82cc-ad66cb99aac0" witdh="300px" height="150px" /></p>      |
| [@dpwl032](https://github.com/dpwl032) | [@jigico](https://github.com/jigico) | [@r03181231](https://github.com/r03181231) | [@seokahee](https://github.com/kahee430) |      [@iinon00](https://github.com/iinon00)      |
|                    팀장                    |                  팀원                  |                      팀원                      |                    팀원                    |        팀원        |
|                          |                    |                                    |                         |  |




<br />

<br />


**프로젝트 명** : V-UP (Volume Up, 불륨업)

**팀 노션** : [V-UP (Volume Up, 불륨업)](https://www.notion.so/VakVakVerse-16f2aa0964ad45f4b09dee8683b39c23)

**개발 기간** : 2024.03. 25~ 2023.05.01 (약 5주간)

**프로젝트 소개** : 음악 플레이어와 커뮤니티를 동시에 즐길 수 있는 플랫폼입니다.

**프로젝트 목표** : 플레이어로 음악을 들으면서, 커뮤니티를 통해 사용자들은 평소 취향에 맞는 음악을 추천하고 추천받음과 동시에 또 평소에 많이 듣지 않은 장르도 편하게 탐색할 수 있습니다. 사용자에게 다양한 음악 경험을 제공합니다.

<br />

### 🚦 Project Rules

#### **개발 환경(버전참고)**

- **Environment :** Visual Studio Code, git(2.37.3), github
  
- **Language :**  Javascript
  
- **Framwork** : Next(14.1.4)

- **Library**
  - next-auth(^4.24.7)
  - zustand(^4.5.2) , tanstack/react-query(^5.28.9)
  - eslint(^9.0.0) , prettier(^3.2.5)

  - dompurify(^3.1.0) , lodash(^4.17.21)
  - react-h5-audio-player(^3.9.1)
  - react-quill(^2.0.0)
  - chart.js(^4.4.2)

  - tailwindcss(^3.3.0) , tailwind-scrollbar-hide(^1.1.7) , tailwindcss-animate(^1.0.7) , prettier-plugin-tailwindcss(^0.5.13)
  - sweetalert2(^11.10.8)
  
- **DB**:  supabase(v2.41.1)
- **Communication** : figma, slack, notion, zep, canva

<br />

### Code Convention

1. interface 보단 type 쓰기
2. types.d.ts 파일 이용하기
3. import 시 import **type** "이름" 으로 type 붙여주고 간격 띄우기

### 네이밍 원칙

- 모호하지 않고 기능을 설명하는 이름 사용
- 검색 가능한 이름 사용
- 동사 - 목적어 순으로 작명
- 넘버링 금지
- 인코딩을 회피하는 네이밍 필수 (접두사, 타입 정보 명시 금지)
- 변수 혹은 함수 이름에 축약어 사용 금지 (btn → button)
- 폴더명은 소문자

### 네이밍 방법

- camelCase → 변수, 함수 이름
- PascalCase → class / component
- snake_case → 안 씀
- SNAKE_CASE → 상수 표현
- kebab-case → route or path name (e.g. /main-page) / class-name
- 변수나 함수는 위와 같이 귀찮더라도 최대한 풀네임으로 작성!! ex) onChangeHandler

### 함수 원칙

- 새로운 리액트 함수 선언은 rafce 스니펫 사용
- 화살표 함수 사용
- 하나의 함수는 하나의 기능만 하도록 설계
- 인수 최소화
- 사이드 이펙트 발생 방지
- 플래그 인수 금지 (독립적인 메소드로 분리 가능하게 설계)

### 주석

- 의도를 명확히 전달하고자 할 때 주석 사용
- 결과에 대한 경고를 전달하고자 할 때 주석 사용

### 소스코드 구조

- 변수와 함수는 사용하는 곳에 가까이 위치하도록 설계
- 위에서 아래로 읽어내려갈 수 있도록 코드 작성
- 공백은 상하 내용의 관련성을 표기하기 위해 사용


### 라이브러리 설치

- yarn 사용 → npm 사용 금지

### 타입스크립트

- interface 보단 type 쓰기
- types.d.ts 파일 이용하기
- import 시 import **type** “이름” 으로 type 붙여주고 간격 띄우기



- 프리티어 설정 :

```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleAttributePerLine": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}

```


<br />

<br />


### **📚프로젝트 운영 방식 및 Rules 예시📚**

  #### **깃허브 규칙**

  - 브랜치 이름 : 기능 이름



### Commit Convention

| 타입     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| Feat     | 기능 구현                                                    |
| Fix      | 버그 수정                                                    |
| Refactor | 코드 리팩토링                                                |
| chore    | 기능에 영향을 주지 않는 코드 수정                            |
| Style    | 스타일링 관련 코드 추가/수정                                 |
| Minor    | 마이너 한 변경사항 (오타 수정, 탭 사이즈 변경, 변수명 변경 등) |
| test     | 테스트 코드                                                  |
| Dir      | 폴더 구조 수정                                               |


### 커밋 메시지 예시

**Feat(#12) : 신규 input 태그에 대한 이벤트 함수 추가**

참고 : 브랜치 빼고 다 대문자!

<br />

<br />

<br />


## 🚩시작 가이드

<br />

### Installation

```bash
$ git clone https://github.com/RE-V-UP/v-up-ver2.git
$ cd v-up-ver2
$ yarn install or npm install
$ yarn run start or npm run start
```

### Environment variable

- 파일 이름 : .env.local
- 변수 이름1 : NEXT_PUBLIC_SUPABASE_URL
- 변수 이름2 : NEXT_PUBLIC_SUPABASE_ANON_KEY
- 변수 이름3 : NEXTAUTH_SECRET
- 변수 이름4 : NEXTAUTH_URL
- 변수 이름5 : KAKAO_CLIENT_ID
- 변수 이름6 : KAKAO_CLIENT_SECRET
  
  
- DB는 supabase를 사용하여 관련된 변수 이름을 부여
- Supabase 클라이언트를 초기화하기 위한 도우미 파일 : src/shared/supabase/supabase.ts

<br />

<br />

## ✨️기능 설명


**[플레이어]**

<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/6a6fdbf0-b226-47af-9938-f8fc810965c1" width="400px" height="300px" >

<br />

- react-h5-audio-player 라이브러리를 활용하여 음악 재생
- 현재 재생중인 노래가 끝나면 다음곡 자동 재생 이전, 다음 곡을 누르면 즉각 반응
- 셔플기능으로 목록 순서가 아닌 랜덤 재생
- 플레이 리스트의 목록 선택, 전체 삭제 선택한 음악 마이플레이 리스트에 저장
- 서비스 내 모든 음악 drag and drop으로 플레이 리스트에 추가
- 플레이 리스트 내 목록 순서를 drag and drop으로 변경

<br />

**[퍼스널 음악 진단]**

<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/07a008d4-93d8-4d03-80f3-160ebae5b3b4" width="400px" height="300px" >

<br />

- 사용자가 입력한 MBTI를 기반으로 해당 유형의 음악 장르별 선호도와 비선호도를 고려하여 추천 음악 선별
- 추천음악은 현재 재생목록에 추가 가능하며 마이페이지에서 언제든 재진단이 가능


<br />

**[마이페이지]**

- 내 정보 수정
  
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/eea993c7-1c66-42ab-a624-76a85a673472" width="400px" height="300px" >

<br />
<br />

- 팔로워, 팔로잉
  
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/675a7410-0b71-4eeb-8a7f-d29cdaaeb738" width="400px" height="300px" >


<br />
<br />

- 마이 플레이 리스트
  
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/4adbdc0a-1fa6-4396-891f-c010b3a479b6" width="400px" height="300px" >

<br />
<br />

- 마이페이지 탭 전환
  
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/7ceef60f-1761-485f-a572-26ecbfa87675" width="400px" height="300px" >

  
<br />

- 유저 정보 수정(프로필 이미지, 닉네임, 정보 공개 여부 설정-마이플레이리스트, 퍼스널 진단 결과, 내가 작성한 글/좋아요한 글)
- 팔로잉 및 팔로잉 취소 기능과 팔로우/팔로워 리스트 조회
- 마이플레이리스트의 노래 관리(추가/삭제)
- 무한 스크롤을 통한 데이터 조회
- 내가 작성한 글, 좋아요한 글 페이지네이션을 통한 데이터 조회

<br />

**[유저 프로필 페이지]**

<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/1328f216-b1a8-451a-8843-59487ecfaab3" width="400px" height="300px" >

<br />

- 유저 팔로잉 및 팔로잉 취소 기능
- 유저가 설정한 정보의 공개 여부에 따라 유저의 프로필 정보 확인(유저의 마이플레이리스트, 퍼스널 뮤직 진단 결과, 유저가 좋아하는 글/작성한 글)
- 유저가 작성한 글, 좋아요한 글 페이지네이션을 통한 데이터 조회

<br />

**[커뮤니티]**


- 커뮤니티 리스트
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/4c071d52-f5c1-4fe2-a884-da5bab27dbb6" width="400px" height="300px" >

<br />
<br />

- 글 등록
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/75b40b6f-1482-4ebe-a384-aa71988e56ef" width="400px" height="300px" >

<br />

- 게시글 작성
- 음악을 공유하는 글을 작성 시, 음악 등록하기 버튼을 클릭하고 들어간 음악 검색 창에서 원하는 음악을 찾아 등록
- 작성할 때 등록한 음악을 플레이어에 drag and drop으로 끌어놓고 미리 듣기 가능
- 게시글 목록
- 등록순과 좋아요순으로 정렬된 게시글을 조회.

<br />

**[커뮤니티 상세]**

<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/0389e2ef-ea63-46bd-9e3c-ab9dfc7015c2" width="400px" height="300px" >

<br />

- 하이퍼 링크, 색상, 스타일 등 서식 있는 텍스트를 생성하고 편집하여 커스텀가능
- 필요한 시점의 렌더링으로 텍스트를 입출력될 때 발생하는 변화를 효율적으로 처리
- Dompurify를 함께 사용해 텍스트를 보호해 안전한 환경을 제공
- 해당 게시글의 좋아요를 클릭 가능

<br />

**[검색]**

- 노래 검색
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/a118c340-c501-4a9c-9da0-74206d99360a" width="400px" height="300px" >

<br />
<br />

- 커뮤니티 검색
<img src="https://github.com/RE-V-UP/v-up-ver2/assets/134026105/9f7b5eed-6605-4e4f-abf2-1703d13eb5d9" width="400px" height="300px" >
  
<br />

- 대소문자 구분 없이 음악 제목 또는 아티스트명으로 음악 검색
- 대소문자 구분 없이 커뮤니티 제목으로 게시글 검색
- 페이지네이션
- 한 페이지당 보여줄 요소의 개수를 arg로 적용
- 전체 페이지가 한 페이지 이상이면 화살표 아이콘을 이용해 다음 페이지 전환


<br />


## ⚽︎트러블슈팅

<br />

### onClick 사용으로 인한 실시간 반영이 되지 않는 문제

  **`이슈`**

- 체크 박스를 커스텀해 유저의 MBTI를 입력받았다. 하지만 onClick의 경우 클릭할 때마다 호출은 되지만 체크박스의 상태를 즉시 반영하지 않아서 유저가 더블클릭을 해야만 MBTI 입력이 가능했다.

<br />

**`해결`**
  
- 사용자의 입력을 실시간으로 반영하기 위해 onChange 함수 사용했다. 이를 통해 유저가 MBTI를 입력을 위해 체크박스를 선택하거나 해제할 때마다 해당 상태가 즉시 업데이트되어 결과를 바로 반영할 수 있었다.

<br />
    
### 역방향 무한스크롤 감지
    
  **`이슈`**
    
- 역방향인 위로 스크롤할 때 intersection observer로 감지해서 데이터를 불러오면 타겟이 보여야 불러오기 때문에 스크롤이 맨 위에 도달해야 데이터가 불러와집니다. 이때, 유저가 계속 스크롤을 맨 위로 올려야 데이터가 불러와지는 문제가 있었습니다.

<br />
    
**`해결`**
    
- 역방향을 감지하는 것은 onScroll 이벤트 핸들러로 스크롤을 감지해서 해결하였습니다.
    
- 유저가 스크롤 했을 때 특정 스크롤 사이즈 값보다 작으면 이전 데이터를 불러오게 하여 스크롤이 맨 위에 도달하기 전에 미리 데이터를 불러올 수 있었습니다.

<br />
    
    
 ### 에디터가 빌드 될 때, document is not defined 오류가 발생하는 문제
    
  **`이슈`**
 
- 퀼 에디터는 DOM 요소를 조작하는 환경인 CSR에서 실행되는데, 기본적으로 SSR을 제공하는 Next에서 DOM 객체를 찾을 수 없어서 해당 오류가 발생했습니다. 

<br />
    
**`해결`**

- Next에서 제공하는 Dynamic 함수를 통해 import 할 때 SSR 환경을 false로 주고, CSR환경을 만들어주어 DOM을 인지할 수 있게 했습니다.

    <br />
    
### 플레이 리스트 index 위치 변경 후 유지되지않는 문제
    
  **`이슈`**
    
- 회원이 담은 플레이 리스트의 테이블 형식은 뮤직 아이디를 담은 배열로 되어있고, 음악정보 테이블과 조인으로 음악 데이터를 가져와 현재 플레이리스트를 만들고 있습니다. 그래서 서버에 등록되어 있는 순서로 자동 정렬 되기때문에  드래그로 인덱스 순서를 변경하더라도 새로고침 시 다시 서버 데이터를 가져오기 때문에 정렬이 유지되지 않는다는 문제가 있었습니다.

<br />
    
**`해결`**
    
1. 뮤직 아이디를 담은 배열 형태를 객체로 바꾸는 게 가장 좋은 방법이지만 전체 코드를 수정해야 하기 때문에 서버 데이터의 순서는 그대로 유지하되, 브라우저에서만 인덱스를 변경시키고 유지하도록 zustand와 로컬 스토리지를 이용하여 해결했습니다.
2. useEffect을 이용해 서버에서 받은 플레이 리스트와 zustand에 저장된 플레이리스트의 값이 변경될 때마다 리렌더링이 일어나도록 의존성 배열에 넣어줬습니다.
3. useEffect 내부에서 zustand에 저장된 customPlayList의 값이 없을 경우에만 서버에서 받아온 currentPlayList를 담아줬습니다.
4. zustand에 저장된 플레이 리스트와 서버에서 받아오는 플레이리스트의 id 값을 비교해 같지 않은 데이터를 추출해 변수에 담아줬습니다.
5. 음악이 추가된 경우, 위에 선언된 변수에 담긴 데이터와 쥬스탄드에 저장된 state를 하나의 배열로 만들어 zustand state에 저장했습니다.
6. 음악이 삭제된 경우, zustand state에 filter로 추가와 동일하게 변수에 담긴 데이터와 음악 아이디 값이 같은 배열을 반환하여  zustand state에 담아줬습니다.
7. 결국 플레이 리스트는 서버 데이터가 아닌, zustand를 이용해 브라우저 localStorage에 저장된 데이터를 사용하게 되므로, 새로고침을 해도 localStorage에 저장된 index 순서를 유지할 수 있게 됐습니다.


<br />

 - playStore
    
        
        ```jsx
        type customListMusicStore = {
          customListData: {
            customPlayList: CurrentPlayListType[]
          }
        
          customListMusic: (customPlayList: CurrentPlayListType[]) => void
        }
        
        const customListMusicState = {
          customListData: {
            customPlayList: [],
          },
        }
        
        export const useCustomListMusicStore = create(
          persist<customListMusicStore>(
            (set, _) => ({
              ...customListMusicState,
              customListMusic: (customPlayList: CurrentPlayListType[]) => {
                set({ customListData: { customPlayList } })
              },
            }),
            {
              name: 'customListMusicStore',
            },
          ),
        )
        
        ```
        
- CurrentMusicList.tsx
        
        ```jsx
        const customListMusic = useCustomListMusicStore(
            (state) => state.customListMusic,
          )
          const { customListData } = useCustomListMusicStore()
          const { customPlayList } = customListData
          
           useEffect(() => {
            // 스테이트가 비어있는경우 서버플리 저장
            if (customPlayList.length === 0) {
              // setCustomList(currentPlayList)
              customListMusic(currentPlayList)
              return
            }
        
            // 디비에서 받아오는 데이터와, 스테이트에 저장한 데이터가 일치하지않은것을 반환
            const addValue = currentPlayList.filter((currentItem) => {
              return customPlayList.every((customItem) => {
                return currentItem.musicId !== customItem.musicId
              })
            })
        
            const removeValues = customPlayList.filter((currentItem) => {
              return currentPlayList.every((customItem) => {
                return currentItem.musicId !== customItem.musicId
              })
            })
        
            // console.log('추가', addValue)
            // console.log('삭제', removeValues)
        
            // 디비플리와 스테이트플리가 동일하지않은경우
            if (addValue.length > 0) {
              // 서버플리가 스테이트 플리보다 많으면, 추가된경우
              const addList = [...customPlayList, ...addValue]
              // setCustomList(addList)
              customListMusic(addList)
            }
            if (removeValues.length > 0) {
              console.log('삭제되면 스테이트 값도 지워줘야겠지 또도를 생각해')
              const currentItems = removeValues.map((item) => {
                return item.musicId
              })
        
              // 커스텀 플레이 리스트에서 삭제된 아이템 제거
              const removeList = customPlayList.filter((item) => {
                return !currentItems.includes(item.musicId)
              })
              // setCustomList(removeList)
              customListMusic(removeList)
            }
          }, [currentPlayList, customPlayList])
        ```


<br />
<br />




## 📂파일 구조

```📦src
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂communitycreate
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂new-password
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂personal-music
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂signout
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂userpage
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(nonAuth)
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂join
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂search
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜NextAuthProvider.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┣ 📜page.tsx
 ┃ ┣ 📜provider.tsx
 ┃ ┗ 📜UserReSessionProvider.tsx
 ┣ 📂components
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜CommentForm.tsx
 ┃ ┃ ┗ 📜CommentsList.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜Container.tsx
 ┃ ┣ 📂communityDetail
 ┃ ┃ ┣ 📜CommunityAddMusic.tsx
 ┃ ┃ ┣ 📜CommunityContents.tsx
 ┃ ┃ ┣ 📜CommunityCreate.tsx
 ┃ ┃ ┣ 📜communityCss.ts
 ┃ ┃ ┣ 📜CommunityNoSsrQuillEditor.tsx
 ┃ ┃ ┣ 📜CommunityQuillEditor.tsx
 ┃ ┃ ┣ 📜ContentsHeader.tsx
 ┃ ┃ ┣ 📜detailCss.ts
 ┃ ┃ ┣ 📜DetailEditDelete.tsx
 ┃ ┃ ┣ 📜DetailuserImage.tsx
 ┃ ┃ ┣ 📜LikeButton.tsx
 ┃ ┃ ┣ 📜QuillEditor.tsx
 ┃ ┃ ┗ 📜value.ts
 ┃ ┣ 📂communityList
 ┃ ┃ ┣ 📜CommunityListData.tsx
 ┃ ┃ ┗ 📜CommunityListSort.tsx
 ┃ ┣ 📂findpassword
 ┃ ┃ ┗ 📜FindPassword.tsx
 ┃ ┣ 📂join
 ┃ ┃ ┣ 📜AllowUserInfo.tsx
 ┃ ┃ ┣ 📜Join.tsx
 ┃ ┃ ┗ 📜value.ts
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜buttonCss.ts
 ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┗ 📜loginCss.ts
 ┃ ┣ 📂logout
 ┃ ┃ ┗ 📜LogOutButton.tsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜GenreMusicItem.tsx
 ┃ ┃ ┣ 📜GenreMusicList.tsx
 ┃ ┃ ┣ 📜MainBanner.tsx
 ┃ ┃ ┣ 📜RandomMusicList.tsx
 ┃ ┃ ┣ 📜RecommendationMusicList.tsx
 ┃ ┃ ┣ 📜SectionTitle.tsx
 ┃ ┃ ┣ 📜SlideButton.tsx
 ┃ ┃ ┗ 📜TopLikedBoard.tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜BoardItem.tsx
 ┃ ┃ ┣ 📜BoardNoData.tsx
 ┃ ┃ ┣ 📜CheckboxItem.tsx
 ┃ ┃ ┣ 📜FollowerList.tsx
 ┃ ┃ ┣ 📜FollowingList.tsx
 ┃ ┃ ┣ 📜LikeBoardList.tsx
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┣ 📜MyInfo.tsx
 ┃ ┃ ┣ 📜MyPlaylist.tsx
 ┃ ┃ ┣ 📜PreviousButton.tsx
 ┃ ┃ ┣ 📜TabMenu.tsx
 ┃ ┃ ┗ 📜WriteList.tsx
 ┃ ┣ 📂personal
 ┃ ┃ ┣ 📜GenderPage.tsx
 ┃ ┃ ┣ 📜MBTIPage.tsx
 ┃ ┃ ┣ 📜PersonalModal.tsx
 ┃ ┃ ┣ 📜PersonalModalDetail.tsx
 ┃ ┃ ┣ 📜PersonalRecommend.tsx
 ┃ ┃ ┣ 📜PersonalSubTest.tsx
 ┃ ┃ ┣ 📜PersonalTestResult.tsx
 ┃ ┃ ┣ 📜ResultChart.tsx
 ┃ ┃ ┗ 📜ResultPage.tsx
 ┃ ┣ 📂player
 ┃ ┃ ┣ 📂playerIcons
 ┃ ┃ ┃ ┣ 📜FaForward.tsx
 ┃ ┃ ┃ ┣ 📜MyLoopIcon.tsx
 ┃ ┃ ┃ ┣ 📜MyLoopOffIcon.tsx
 ┃ ┃ ┃ ┣ 📜MyNextIcon.tsx
 ┃ ┃ ┃ ┣ 📜MyPauseIcon.tsx
 ┃ ┃ ┃ ┣ 📜MyPlayIcon.tsx
 ┃ ┃ ┃ ┣ 📜MyPreviousIcon.tsx
 ┃ ┃ ┃ ┗ 📜ProgressContainer.tsx
 ┃ ┃ ┣ 📜AudioCss.css
 ┃ ┃ ┣ 📜CurrentMusicList.tsx
 ┃ ┃ ┣ 📜MusicPlayer.tsx
 ┃ ┃ ┗ 📜Player.tsx
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📜GenreMusicRecommendations.tsx
 ┃ ┃ ┣ 📜GenreRandomMusic.tsx
 ┃ ┃ ┣ 📜ModalMusicData.tsx
 ┃ ┃ ┣ 📜MusicSearch.tsx
 ┃ ┃ ┣ 📜MusicSearchModal.tsx
 ┃ ┃ ┣ 📜NoSearchResult.tsx
 ┃ ┃ ┣ 📜NoSearchResultItem.tsx
 ┃ ┃ ┣ 📜SearchedCommunityData.tsx
 ┃ ┃ ┣ 📜SearchedMusicData.tsx
 ┃ ┃ ┗ 📜SearchForm.tsx
 ┃ ┣ 📂service
 ┃ ┃ ┣ 📜Service.tsx
 ┃ ┃ ┗ 📜ServiceModal.tsx
 ┃ ┣ 📂socialLogin
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂userpage
 ┃ ┃ ┣ 📜LikeBoardList.tsx
 ┃ ┃ ┣ 📜LockContents.tsx
 ┃ ┃ ┣ 📜UserInfo.tsx
 ┃ ┃ ┣ 📜UserPlaylist.tsx
 ┃ ┃ ┗ 📜WriteList.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┗ 📜Header.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useInput.ts
 ┣ 📂query
 ┃ ┣ 📂community
 ┃ ┃ ┗ 📜communityQueryKey.ts
 ┃ ┣ 📂communityDetail
 ┃ ┃ ┣ 📜mutation.ts
 ┃ ┃ ┗ 📜queryKey.ts
 ┃ ┣ 📂genreMusic
 ┃ ┃ ┗ 📜queryKeys.ts
 ┃ ┣ 📂musicPlayer
 ┃ ┃ ┗ 📜musicPlayerQueryKeys.ts
 ┃ ┣ 📂personal
 ┃ ┃ ┣ 📜keys.constant.ts
 ┃ ┃ ┣ 📜useMutationPersonal.ts
 ┃ ┃ ┗ 📜useQueryPersonal.ts
 ┃ ┣ 📂search
 ┃ ┃ ┗ 📜searchQueryKeys.ts
 ┃ ┗ 📂user
 ┃ ┃ ┗ 📜userQueryKeys.ts
 ┣ 📂shared
 ┃ ┣ 📂comment
 ┃ ┃ ┗ 📜commentApi.ts
 ┃ ┣ 📂comments
 ┃ ┃ ┗ 📜commentsApi.ts
 ┃ ┣ 📂community
 ┃ ┃ ┗ 📜api.ts
 ┃ ┣ 📂communitydetail
 ┃ ┃ ┗ 📜detailApi.ts
 ┃ ┣ 📂join
 ┃ ┃ ┗ 📜joinApi.ts
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜loginApi.ts
 ┃ ┣ 📂main
 ┃ ┃ ┗ 📜api.ts
 ┃ ┣ 📂musicPlayer
 ┃ ┃ ┗ 📜api.ts
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📜api.ts
 ┃ ┣ 📂personal
 ┃ ┃ ┗ 📜personalApi.ts
 ┃ ┣ 📂search
 ┃ ┃ ┗ 📜api.ts
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜communityDetailStore.ts
 ┃ ┃ ┣ 📜paginationStore.ts
 ┃ ┃ ┣ 📜personalStore.ts
 ┃ ┃ ┣ 📜playerStore.ts
 ┃ ┃ ┗ 📜searchStore.ts
 ┃ ┣ 📂supabase
 ┃ ┃ ┗ 📜supabase.ts
 ┃ ┣ 📂userpage
 ┃ ┃ ┗ 📜api.ts
 ┃ ┗ 📜store.ts
 ┣ 📂types
 ┃ ┣ 📂comment
 ┃ ┃ ┗ 📜type.ts
 ┃ ┣ 📂comments
 ┃ ┃ ┗ 📜type.ts
 ┃ ┣ 📂community
 ┃ ┃ ┗ 📜type.ts
 ┃ ┣ 📂communityDetail
 ┃ ┃ ┗ 📜detailTypes.ts
 ┃ ┣ 📂loginJoin
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂main
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂musicPlayer
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂personal
 ┃ ┃ ┗ 📜type.ts
 ┃ ┗ 📜supabase.ts
 ┗ 📂util
 ┃ ┣ 📂main
 ┃ ┃ ┗ 📜util.ts
 ┃ ┣ 📂personal
 ┃ ┃ ┗ 📜util.ts
 ┃ ┣ 📜ButtonPrimary.tsx
 ┃ ┣ 📜ButtonSecondary.tsx
 ┃ ┣ 📜font.ts
 ┃ ┣ 📜InfiniteScrollContainer.tsx
 ┃ ┣ 📜Modal.tsx
 ┃ ┣ 📜Pagination .tsx
 ┃ ┣ 📜useIntersectionObserver.ts
 ┃ ┗ 📜util.ts
```
