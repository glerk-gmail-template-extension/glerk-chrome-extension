# 🌱 Intro

<div align="center">
  <h3>Glerk: Gmail Template Chrome Extension</h3>

Glerk은 지메일 사용자들이 편리하고 효율적으로 이메일 템플릿을 사용할 수 있게 도와주는 크롬 익스텐션입니다.

이메일 템플릿 중 반복적으로 수정하는 부분을 변수로 관리해 적은 노력으로 빠르게 템플릿을 적용할 수 있습니다.

</div>

<br />

# 🗂️ Index

- [Links](#links)
- [Motivation](#-motivation)
- [Tech Stacks](#-teck-stacks)
- [Features](#-features)
- [Challenges](#%EF%B8%8F-challenges)
- [Schedule](#schedule)
- [Memoir](#memoir)

<br />

# 🔗 Links

Deployed Extension | [Deployed Website](https://glerk.netlify.app) | [Extension Repository](https://github.com/glerk-gmail-template-extension/glerk-chrome-extension) | [Frontend Repository](https://github.com/glerk-gmail-template-extension/glerk-client) | [Backend Repository](https://github.com/glerk-gmail-template-extension/glerk-server)

<h6 align="right">* 익스텐션 배포 준비 중입니다.</h6>

<br />

# 🔥 Motivation

이메일은 현대 비즈니스와 일상에서 중요한 소통 수단으로 자리잡았습니다. 많은 사람들이 매일 수십 개의 이메일을 주고받으며, 종종 비슷한 내용의 메일을 반복해서 작성하곤 합니다.  
이러한 반복적인 이메일 작성 업무는 시간과 노력을 많이 요구하며, 때로는 실수나 일관성 없는 내용으로 인해 전문성을 해칠 수 있습니다.

"자주 그리고 반복적으로 보내는 이메일을 더 빠르고 정확하게 작성할 수는 없을까요?"

많은 사람들은 이메일을 작성할 때마다 비슷한 내용을 반복해서 쓰는 번거로움을 겪고 있습니다.

"이메일 템플릿을 쉽게 관리하고, 필요할 때 바로 적용할 수 있다면 어떨까요?"

이러한 고민에서 출발하여, 저는 지메일 사용자들의 이메일 작성 경험을 개선하고자 지메일 템플릿 크롬 익스텐션 프로젝트를 시작하게 되었습니다.  
사용자별로 커스터마이즈된 템플릿을 쉽게 관리하고, 변수 기능을 통해 유연하게 내용을 수정할 수 있으며, 수신자 정보까지 미리 설정할 수 있는 기능을 통해 이메일 작성의 효율성과 일관성을 크게 높이고자 했습니다.

이 프로젝트를 통해, 사용자들이 더 빠르고 정확하게 이메일을 작성하여 업무 효율성을 높이고, 반복적인 작업에서 오는 피로를 줄이며, 궁극적으로는 더 나은 커뮤니케이션을 할 수 있기를 희망합니다.

<br />

# 🛠 Tech Stacks

## Chrome Extension

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Crxjs-E9BCE2?style=for-the-badge" /> <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />

## Client

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Jotai-20232A?style=for-the-badge" /> <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />

## Server

<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" /> <img src="https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" /> <img src="https://img.shields.io/badge/Spring Data JPA-6DB33F?style=for-the-badge" /> <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white" /> <img src="https://img.shields.io/badge/JUnit5-CC5B50?style=for-the-badge" /> <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" /> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white" /> <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white" /> <img src="https://img.shields.io/badge/AWS_RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white" />

<br />

# 💻 Features

<br />

# 🛤️ Challenges

## 1. 어떻게 크롬 익스텐션과 웹사이트의 로그인 상태를 동기화할 수 있을까?

### 크롬 익스텐션과 웹사이트의 로그인 상태 동기화

구글 로그인과 같은 소셜 로그인을 사용하면 사용자는 웹사이트를 사용하기 위해 따로 아이디와 패스워드를 만들 필요 없이 웹사이트를 이용할 수 있다는 간편함과 회원가입의 장벽이 낮다는 장점이 있습니다.  
또한 저의 프로젝트는 지메일 사용자를 대상으로 하는 크롬 익스텐션이기 때문에 모든 예비 사용자가 구글 로그인이 가능할 것이라 판단하여 구글 OAuth 인증을 이용해 로그인 기능을 구현하기로 결정했습니다.

초기에는 사용자가 구글 로그인을 진행하면 서버에서 인증 과정을 거친 후 JWT 토큰을 응답 헤더에 보낸 후 localStorage에 저장하는 방식을 사용했습니다. 그러나 이 방식은 사용자가 웹사이트와 익스텐션에서 각각 로그인해야 하는 불편함을 초래했습니다.

제가 원하는 것은 웹사이트에서 사용자가 로그인을 한 상태라면 크롬 익스텐션도 자동으로 로그인 상태로 동기화되고, 크롬 익스텐션에서 로그아웃하면 웹사이트에서도 로그아웃되는 것이었습니다.

이를 위해 여러 방법을 찾아보았고, 크롬 익스텐션의 manifest.json 파일에서 host_permissions에 웹사이트와 서버의 도메인을 등록하면, 익스텐션에서 서버에 요청할 때 확장 프로그램이 자동으로 웹사이트와 동일한 쿠키를 사용한다는 점을 발견했습니다.  
이를 활용하면 확장 프로그램에는 자체 인증 흐름이 불필요함과 동시에 익스텐션과 웹사이트가 완전히 동기화될 수 있겠다 판단하여 구현해 보았습니다.

<img style="width: 400px" src="https://github.com/user-attachments/assets/38990486-1fe6-4453-9ca7-6d48ace3a8e0" alt="login flow" />

<br />
<br />

쿠키 기반 인증 방식으로 전환한 뒤, 사용자는 한 번의 로그인으로 웹사이트와 익스텐션 모두에서 인증 상태를 유지할 수 있게 되었습니다.  
이를 통해 사용자 경험이 향상될 것으로 기대합니다.

## 2. 지메일 사이트에서 리액트 인터랙티브 컴포넌트를 자유자재로 적용하기

### 2-1. 지메일 사이트에서 리액트 인터랙티브 컴포넌트 적용하기

지메일 사이트에서 리액트 인터랙티브 컴포넌트를 적용하기 위해 처음에는 바닐라 자바스크립트로 개발을 시작했지만, 복잡한 상태 관리의 필요성이 대두되면서 리액트의 도입을 고려하게 되었습니다.  
그러나 지메일과 같은 외부 사이트의 DOM에 리액트 컴포넌트를 렌더링하는 것이 가능할지에 대한 의문이 있었습니다.

조사 결과, React의 createPortal 기능을 발견할 수 있었습니다.

createPortal을 사용하면 리액트 컴포넌트를 DOM 트리의 다른 부분에 렌더링할 수 있어, 지메일의 DOM 구조 내에 우리의 커스텀 컴포넌트를 자연스럽게 통합할 수 있었습니다.

```jsx
{
  isHashtagMode &&
    createPortal(
      <HashtagList
        hashtagKeyword={hashtagKeyword}
        hashtagPosition={hashtagPosition}
        onTemplateClick={handleTemplateSelect}
        onTemplateMouseDown={handleTemplateMouseDown}
        cursorRef={cursorRef}
      />,
      document.querySelector(
        `div[aria-labelledby='${emailEditorId}'], #${emailEditorId}`,
      ),
    );
}
```

<br />

<div>
  <img style="width: 400px" src="https://github.com/user-attachments/assets/1a20011d-7803-497f-a3c7-6bc046e63658" alt="input hashtag" />
</div>

[해시태그 키워드 입력 시 지메일 DOM에 리액트 컴포넌트가 추가되는 모습]

<br />

### 2-2. 직전 텍스트 커서 위치에 템플릿을 삽입하기

지메일 에디터에서 템플릿을 선택해 적용할 때 캐럿(텍스트 커서) 위치가 변경되는 문제에 직면했습니다. 이를 해결하기 위해 캐럿 정보를 cursorRef에 저장할 때 객체를 직접 담았습니다.  
하지만 나중에 해당 객체를 사용하려고 보니 캐럿 위치가 올바르게 반영되지 않았습니다. 이는 객체가 참조형 데이터이기 때문에 발생한 문제로, 원본 데이터가 변경되면 참조하고 있는 데이터도 변경되기 때문입니다.

이 문제를 해결하기 위해 버튼을 클릭하는 시점의 캐럿 정보를 저장할 때 새로운 객체에 필요한 정보만 저장하는 방식을 사용했습니다.  
이 방법을 통해 사용자가 의도한 위치에 정확하게 템플릿을 삽입할 수 있게 되었습니다.

```js
export const storeCurrentCursor = (cursorRef) => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    cursorRef.current = {
      rangeCount: selection.rangeCount,
      range: selection.getRangeAt(0).cloneRange(),
      removeAllRanges: () => selection.removeAllRanges(),
      addRange: (range) => selection.addRange(range),
    };
  }
};
```

[`storeCurrentCursor` 함수는 현재 캐럿 위치를 정확히 저장하여, 나중에 이를 사용할 때 올바른 위치로 복원할 수 있도록 합니다.]

<br />

<img style="width: 400px" src="https://github.com/user-attachments/assets/a4c4a7ef-d3e1-4c4b-ac6b-bdb81851cfee" alt="텍스트 커서 위치에 템플릿 적용" />

<br />
<br />

### 2-3. 지메일 에디터에서 단축어를 입력하면 리액트 컴포넌트를 동적 렌더링 하기

지메일 에디터에서 '#'와 단축어를 입력하면 템플릿 목록을 동적으로 표시하도록 기획했습니다.

제가 계획한 것은 지메일 에디터에 '#'을 입력하고 단축어를 입력하면 템플릿 목록이 캐럿 위치를 기준으로 오른쪽 아래에 표시되도록 하는 것이었습니다.

<div>
  <img style="width: 600px" src="https://github.com/user-attachments/assets/9297b7b8-683a-4c9d-9cc2-31182d7e745e" />
</div>
[의도하지 않은 위치에 렌더링 되는 컴포넌트]

<br />
<br />

템플릿 리스트를 렌더링하기 위해 position absolute 속성과 top, left에 값을 줌으로써 동적으로 렌더링하려 했습니다.
하지만 문제는 현재 캐럿의 위치는 window 창을 기준으로 값을 받을 수 있었고, 렌더링할 때의 위치 기준은 window가 아닌 지메일 에디터 창이 었기 때문에 예상과 다른 위치에 렌더링 된다는 점이었습니다.

이를 해결하기 위해 지메일 에디터의 위치를 기준으로 커서 위치 계산하는 로직을 구현했습니다.

<img style="width: 600px" src="https://github.com/user-attachments/assets/65949390-6d7d-4b38-86d1-0dee99935b50" />

<br />
<br />

이후에 만난 문제 상황은 템플릿 목록이 윈도우 창의 범위를 넘어가는 케이스 였습니다.

<div>
  <img style="width: 600px" src="https://github.com/user-attachments/assets/c1bac27c-7034-4430-92cd-7fb30534b38d" />
</div>
[컴포넌트가 윈도우 창 내에 위치하지 않는 케이스]

이를 해결하기 위해 이를 위해 화면의 크기와 컴포넌트의 크기를 고려하여

사용자 경험을 위하여 캐럿 위치 기준으로

- 첫번째는 우측 하단에 위치
- 두번째는 좌측 하단에 위치
- 세번재는 우측 상단에 위치
- 마지막은 좌측 상단에 위치
  하면서 컴포넌트가 창 밖으로 벗어나지 않도록 렌더링 위치를 계산하는 로직을 추가했습니다.

<img style="width: 600px" src="https://github.com/user-attachments/assets/adf06701-5d1c-4d04-a5ec-b4d5c8d49a21" />

## 3. 이메일에 오타가 나도 유사한 이메일을 추천해 주기 위해서는 어떻게 해야할까?

# Schedule

# Memoir
