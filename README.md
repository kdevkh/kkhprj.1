# Prj.1_MovieSearch

내일배움캠프 JavaScript 개인과제 #1

**Schedule**
- Wireframe 제작
- Respository 생성
- 기본 뼈대 html css
- API 연결
- 카드 만들기
- 클릭시 ID alert 구현
- 영화 검색창 구현
    - 웹사이트 랜딩시 검색 입력란에 커서 자동 위치
    - 대소문자 관계 없이 검색
    - 키보드 enter키 = 검색
- 리팩토링
- 파일 나누기 (html, css, javascript)

추가 기능
- 카드 정렬
- 카드 입력 (모달창)
- 정보 더보기 카드
- 배너

![image](https://github.com/kdevkh/kkhprj.1/assets/154044124/1c5c960d-dd22-4a8a-a544-49e8fe421dc4)



---내일배움캠프 Guideline---
# JavaScript 개인 과제

### 과제를 살펴볼까요?🤔

<aside>
🚩 [자바스크립트 개인 과제]

- Javascript과정을 마무리하며, JS 문법의 핵심을 적용해 볼 수 있는 **영화 검색 사이트**를 제작합니다.
- 영화정보 오픈API인 TMDB(The Movie DB)를 사용합니다.
</aside>

### 과제 개요

1. 순수 바닐라 자바스크립트만으로 영화 리스트 조회 및 검색 UI 구현
2. 학습해온 자바스크립트 문법을 최대한 활용
3. 스타일링 작업하며 css 와 친해지기

### 요구사항

- 완성본 예시
    
    https://nabacam-movies.vercel.app/
    
    **디자인은 완성본 예시와 동일할 필요 없습니다. 디자인은 자유롭게 하되, 기능적으로 요구사항을 만족시켜 주세요.**
    
- (1) 필수요구사항
    - [1] jQuery 라이브러리 사용없이 **순수 바닐라 자바스크립트** 사용하기
        - JavaScript 문법 종합반에서 학습한 내용과 지난 예제문제를 참조해 보세요
    - [2] TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기
        
        <aside>
        💡 **[TMDB 오픈 API란?]**
        전 세계에서 가장 많이 사용하는 영화 정보 오픈 API 중 하나입니다. ‘감독’, ‘출연진’, 포스터’ 등 다양한 서비스를 대부분 무료로 제공합니다.
        
        아래 안내 사항을 따라하며 본인의 API KEY로 인기영화 리스트 데이터를 받아올 준비를 해보세요.
        
        - TMDB 가입 및 API 요청 방법 안내
            1. 회원가입: https://www.themoviedb.org/signup?language=ko
            2. 이메일 인증: 회원가입 시 입력한 이메일함에 가서 “Activate My Account” 버튼 클릭 후 로그인
            3. 프로필과 설정 버튼 클릭 후 설정 클릭
                - 스크린샷 참고
                    
                    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e3428c3-8fbc-42ec-a8fc-e2dadd6ded63/Untitled.png)
                    
            4. 좌측 사이드메뉴에서 API 메뉴 클릭 후 API 키 요청 섹션의 ‘click here’ 클릭
                - 스크린샷 참고
                    
                    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ceea91a7-fc6c-4bd4-ab02-c5a4f199d913/Untitled.png)
                    
            5. “What type of API key do you wish to register?” ********라는 질문에 Developer 클릭 후 동의
            6. API 신청양식 채우고 제출버튼 클릭
                - 스크린샷 참고
                    
                    ![API신청양식.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3efa6d8-bf47-46bd-b951-3a8530c47a43/API%E1%84%89%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8.png)
                    
            7. API 문서로 이동하기
                - 스크린샷 참고
                    
                    ![API문서이동.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f68e245f-927f-4b7f-9b36-aab6266eb62b/API%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC.png)
                    
            8. 영화 API 요청 코드 복사하기 (1~4번 순서대로 진행)
                - 스크린샷 참고 (4번의 Try it! 버튼 클릭하여 Response Data 확인하기)
                    
                    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/55227e71-e11c-4058-bfd0-9b602fb81ddc/Untitled.png)
                    
            9. 본인의 js 코드에 8번에서 복사한 코드 적용하기
        </aside>
        
    - [3] 영화정보 카드 리스트 UI 구현
        - TMDB에서 받아온 데이터를 브라우저 화면에 카드 형태의 데이터로 보여줍니다.
        - 카드에는 title(제목), overview(내용 요약), poster_path(포스터 이미지 경로), vote_average(평점) 이렇게 4가지 정보가 필수로 들어갑니다.
            
            <aside>
            💡 TMDB 에서 영화 이미지를 가져오려면?
            https://developer.themoviedb.org/docs/image-basics
            위 문서를 참고하여 image url 확인해 보세요.
            image url 은 base url + file size + file path 로 구성됩니다.
            
            </aside>
            
        - 카드 클릭 시에는 클릭한 영화 id 를 나타내는 alert 창을 띄웁니다.
            - 스크린샷
                
                ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7007a3aa-483d-46e4-8110-4bdd2c2559e3/Untitled.png)
                
    - [4] 영화 검색 UI 구헌
        - API로 받아온 전체 영화들 중 영화 제목에 input 창에 입력한 문자값이 포함되는 영화들만 화면에 보이도록 합니다.
        - 입력 후 검색버튼 클릭 시 실행되도록 합니다.
    - [5] 하기 기재된 Javascript 문법 요소를 이용하여 구현
        - 문법 리스트
            - const와 let만을 이용한 변수 선언 필수
                
                ```jsx
                const a = 'test 01';
                let b = 'test 02';
                
                var c = 'no way!'; //쓰지 말 것
                ```
                
            - 화살표 함수 : 하기 예시 중 1개 이상 사용
                - 일반 화살표 함수
                    
                    ```jsx
                    let add = (x, y) => {
                      return x + y;
                    }
                    
                    console.log(add(2, 3));   // 5
                    ```
                    
                - 한 줄로 된 화살표 함수
                    
                    ```jsx
                    let add = (x, y) => x + y;
                    
                    console.log(add(2, 3));   // 5
                    ```
                    
                - 매개변수가 하나인 화살표 함수
                    
                    ```jsx
                    let square = x => x * x;
                    
                    console.log(square(3));   // 9
                    ```
                    
            - 배열 메소드 : 하기 예시 중 2개 이상 사용
                - forEach
                - map
                - filter
                - reduce
                - find
            - DOM 제어하기 : 하기 api 목록 중 2개 이상 사용하기
                
                <aside>
                💡 1.  문서 객체 생성과 선택
                
                - `document.createElement(tagName)` : 새로운 HTML 요소를 생성합니다.
                - `document.getElementById(id)` : id 속성을 기준으로 요소를 선택합니다.
                - `document.getElementsByTagName(name)` : 태그 이름을 기준으로 요소를 선택합니다.
                - `document.getElementsByClassName(name)` : 클래스 이름을 기준으로 요소를 선택합니다.
                - `document.querySelector(selector)` : CSS 선택자를 이용하여 요소를 선택합니다.
                - `document.querySelectorAll(selector)` : CSS 선택자를 이용하여 모든 요소를 선택합니다.
                1. 문서 객체 조작
                - `element.innerHTML` : 해당 요소 내부의 HTML 코드를 변경합니다.
                - `element.textContent` : 해당 요소 내부의 텍스트를 변경합니다.
                - `element.setAttribute(attr, value)` : 해당 요소의 속성 값을 변경합니다.
                - `element.getAttribute(attr)` : 해당 요소의 속성 값을 가져옵니다.
                - `element.style.property` : 해당 요소의 스타일 값을 변경합니다.
                - `element.appendChild(child)` : 해당 요소의 하위 요소로 child를 추가합니다.
                - `element.removeChild(child)` : 해당 요소의 하위 요소 중 child를 삭제합니다.
                - `element.classList.add(class)` : 해당 요소의 클래스에 새로운 클래스를 추가합니다.
                - `element.classList.remove(class)` : 해당 요소의 클래스 중에서 특정 클래스를 제거합니다.
                - `element.classList.toggle(class)` : 해당 요소의 클래스 중에서 특정 클래스를 추가 또는 제거합니다.
                1. 이벤트 처리
                - `element.addEventListener(type, listener)` : 해당 요소에서 이벤트가 발생했을 때 호출할 함수를 등록합니다.
                - `element.removeEventListener(type, listener)` : 해당 요소에서 등록된 함수를 제거합니다.
                - `event.preventDefault()` : 이벤트가 발생했을 때 기본 동작을 취소합니다.
                - `event.stopPropagation()` : 이벤트의 버블링을 방지하기 위해 이벤트 전파를 중지합니다.
                1. 기타
                - `window.location.href` : 현재 페이지의 URL을 가져옵니다.
                - `window.alert(message)` : 경고 메시지를 출력합니다.
                - `window.confirm(message)` : 확인 메시지를 출력하고 사용자의 답변에 따라 Boolean 값을 반환합니다.
                </aside>
                
- (2) 선택요구사항
    - CSS
        - flex 사용하기
        - grid 사용하기
    - 웹사이트 랜딩 또는 새로고침 후 검색 입력란에 커서 자동 위치시키기
    - 대소문자 관계없이 검색 가능하게 하기
    - 키보드 enter키를 입력해도 검색버튼 클릭한 것과 동일하게 검색 실행시키기
    - 원하는 추가기능 무엇이라도 okay!
        - 여러분의 챌린지는 언제나 환영합니다. 필수 요구사항이 완료되었다면, 자유롭게 추가기능을 넣어주세요.
        - 단, 우선순위는 필수요구사항임을 명심해주세요!

<aside>
💡 기초만 배우다가, 해당 과제를 보니 조금 어려우신가요?

</aside>

1. 해당 과제의 큰 그림을 그려봅시다.
2. 그 그림을 바탕으로 코드를 작성해봅시다.
3. 깃허브 레포지토리를 만들고 코드를 커밋, 푸쉬합시다. 
4. 구글폼을 통해 과제를 제출합니다.`(제출 링크는 추후 공지 예정)`
5. 팀원들과 코드 리뷰를 해봅시다. 
    1. 코드 공유를 두려워해선 안됩니다. 
        
        ‘나는 못했어요.’ 라는 말 금지! 무조건 설명하고, 무조건 답 얻어가기!
        
    2. 코드 공유를 불필요하다고 생각해서는 안됩니다.
    ’내가 설명해줘도 팀원은 이해 못할테니 코드 리뷰 안해!’ 라는 생각 금지! 
    여러분의 코드를 누군가에게 설명하는 습관을 들여야 합니다.
6. 튜터님의 피드백, 팀원들과 코드 리뷰를 바탕으로 나의 코드를 조금씩 보완해 나가봅시다.
