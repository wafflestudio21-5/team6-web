# 🎥 와플피디아 🎥

🧇[**와플피디아**](https://d1vexdz72u651e.cloudfront.net/) 는 [**왓챠피디아 웹사이트**](https://pedia.watcha.com/ko-KR/)의 클론 프로젝트입니다! 기존의 왓챠피디아는 영화와 책, TV 프로그램에 대해 추천을 받을 수 있고, 자신의 관람평과 별점을 공유하여 다른 유저와 소통하는 **콘텐츠 추천 & 의견 커뮤니티 웹서비스** 입니다. 저희 TEAM6 팀원들은 개발기간과 서로의 역량을 고려하여, 와플피디아를 **영화 콘텐츠에 대한 의견 커뮤니티 서비스**에 집중하는, 그러나 핵심적이고 필수적인 기능들을 내실 있게 제공하는 웹서비스로 완성하고자 하였습니다. 많이 부족하지만 열과 성을 다해 제작한 저희 와플피디아 서비스를 만족스럽게 사용하실 수 있기를 바랍니다🙏🙏

개발 기간 : 23.12.28 ~ 24.02.02

\*본 레포는 **TEAM6-WEB REPO** 이므로 FRONTEND 개발에 관한 내용을 위주로 설명합니다.

BACKEND 개발에 관해 궁금하시다면? [TEAM6-SERVER REPO](https://github.com/wafflestudio21-5/team6-server)
<br/><br/>

## 💻 배포

프론트엔드 서버 도메인(Web server) : <https://d1vexdz72u651e.cloudfront.net/>

백엔드 서버 도메인(Api server) : <https://wafflepedia.xyz/>

웹서버의 경우 AWS S3 + CLOUDFRONT를 이용하여 배포하였습니다.
<br/><br/>

## 🙋‍♂️ 개발팀 & 역할 분담

오수현 [@ohsuhyeon0119](https://github.com/ohsuhyeon0119)

- 팀장 역할 수행 및 일정 관리
- 유저 페이지 및 유저 하위 페이지 디자인&기능 / 인증 서비스 구현
  <br/><br/>

박민철 [@ComPhyPark](https://github.com/ComPhyPark)

- 랜딩 페이지 디자인&기능 구현
- 웹서비스의 전체적인 버그 수정
  <br/><br/>

정우진 [izone00](https://github.com/izone00)

- 영화 개별 페이지 및 콘텐츠 하위 페이지들에 대한 전반적인 디자인&기능 구현
- 와플피디아만의 추가 서비스 (내가 구경한 영화 모음 보관함) 구현
  <br/><br/>

## 🔧 Stacks

#### 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> &nbsp; &nbsp; &nbsp; <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/cssmodules-000000?style=for-the-badge&logo=cssmodules&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<br/><br/>

#### 협업

<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<br/><br/>

## 📃 주요 PAGE & MODAL 소개

|                                                                                                                                    |                                                                                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|         ![page_main](https://github.com/wafflestudio21-5/team6-web/assets/141830897/c3f9a538-698b-4877-ba8b-926cc6e85f17)          |      ![page_content](https://github.com/wafflestudio21-5/team6-web/assets/141830897/c1adf20f-4971-4f7a-b8ab-0666ad1b495c)       |
|                                                          **메인 페이지**                                                           |                                                       **개별 영화페이지**                                                       |
|   **_박스오피스_** 순위와 **_최신 영화_**, 그리고 **_team6 팀원들이 직접 선정한 영화 목록_** 에 대한 캐러셀을 제공하고 있습니다.   | 각 영화별로 영화에 대한 기본 데이터(줄거리, 포스터 등)를 제공하고, 유저는 별점을 매기거나 코멘트로 감상평을 작성할 수 있습니다. |
|         ![moda_write](https://github.com/wafflestudio21-5/team6-web/assets/141830897/ad1840e1-b75f-4e9f-955e-753bc1d0c338)         |      ![page_comment](https://github.com/wafflestudio21-5/team6-web/assets/141830897/80d9fe4a-be09-468a-887e-16b00c94b14d)       |
|                                                    **영화별 코멘트 작성 모달**                                                     |                                                     **개별 코멘트 페이지**                                                      |
| 각 영화에 대해 코멘트를 작성할 수 있습니다. 코멘트가 스포일러를 포함하는 지 여부를 체크할 수 있고, 이에 따라 관련 UI가 달라집니다. |   대상 영화를 포함한 코멘트 정보와, 코멘트에 달리는 댓글 목록이 제공됩니다. 댓글을 자유롭게 작성, 수정, 삭제 할 수 있습니다.    |
|      ![page_commentList](https://github.com/wafflestudio21-5/team6-web/assets/141830897/9afea23d-b32e-4608-8273-0b8d37456ab2)      |       ![page_search](https://github.com/wafflestudio21-5/team6-web/assets/141830897/1f1501ac-fa59-4b96-b3a5-bb6e61eef352)       |
|                                                      **코멘트 리스트 페이지**                                                      |                                                         **검색 페이지**                                                         |
|           영화 개별 / 내가 작성한 코멘트 별 / 내가 좋아한 코멘트 별로 목록이 제공됩니다. 정렬 방식을 선택할 수 있습니다.           |                                           영화 & 유저에 대한 통합 검색이 가능합니다.                                            |
|         ![page_user](https://github.com/wafflestudio21-5/team6-web/assets/141830897/69770940-19f7-49d5-87fb-5ed5e5104181)          |      ![modal_profile](https://github.com/wafflestudio21-5/team6-web/assets/141830897/482d3932-0934-4597-8d4a-68a1ba7b724e)      |
|                                                          **유저 페이지**                                                           |                                                      **Profile 편집 모달**                                                      |
|                               로그인한 본인 계정 & 다른 계정의 유저 관련 정보를 확인할 수 있습니다.                                |                                   닉네임, 설명글, 배경 사진, 대표 사진을 변경할 수 있습니다.                                    |
|        ![page_rating](https://github.com/wafflestudio21-5/team6-web/assets/141830897/ce83a2be-1251-4131-9dbc-95daa3d51785)         |      ![page_storage](https://github.com/wafflestudio21-5/team6-web/assets/141830897/2614d989-82b6-4d3a-9830-6db9439be3d3)       |
|                                                 **유저가 평가한 영화 목록 페이지**                                                 |                                                  **유저의 영화 보관함 페이지**                                                  |
|          유저가 별점을 매긴 영화 목록을 확인할 수 있습니다. 별점 순 탭에서는 각 별점 별로 영화 목록을 확인할 수 있습니다.          |                       평가 영화 목록 / 보고 싶어요 및 보는 중으로 등록한 영화 목록 을 확인할 수 있습니다.                       |
|           ![image](https://github.com/wafflestudio21-5/team6-web/assets/141830897/399655bf-7bba-4f80-8a18-bf85e41ea30a)            |       ![modal_login](https://github.com/wafflestudio21-5/team6-web/assets/141830897/8be99c0d-7665-4e1d-b85a-8cf0296ec28b)       |
|                                                         **유저 설정 모달**                                                         |                                                          **인증 모달**                                                          |
|                                프로필 공유(클립보드 복사) / 로그아웃 / 회원탈퇴 기능이 제공됩니다.                                 |                                  로그인 & 회원가입 모달이 있고 카카오 소셜로그인이 가능합니다.                                  |

## 📱 모바일 반응형

와플피디아는 반응형 웹(Responsive Web)입니다. 여러 종류의 화면 크기에도 자연스럽게 서비스를 이용할 수 있습니다. 모바일 용 디자인이 왓챠피디아의 모바일 웹과 완전히 동일하지는 않습니다. 그러나 저희 프론트엔드 팀원들은 개발 과정에서 최대한 반응형을 고려하여 제작하였습니다. 와플피디아의 주요 반응형 페이지들을 모아 봤습니다.
||||
|:-----:|:-----:|:----:|
|![image](https://github.com/wafflestudio21-5/team6-web/assets/141830897/1df1212c-c8be-4262-8fde-55f05faf2bd8)|![responsive_content](https://github.com/wafflestudio21-5/team6-web/assets/141830897/87114f59-204c-4184-b534-19933e6f07e5)|![responsive_comment](https://github.com/wafflestudio21-5/team6-web/assets/141830897/25c4eb1e-1be7-4231-916a-04485d211666)|
|메인|영화 개별|코멘트 개별|
|![responsive_user](https://github.com/wafflestudio21-5/team6-web/assets/141830897/11cc25e3-a1bd-438c-9e29-71ccfc06beb2)|![responsive_storage](https://github.com/wafflestudio21-5/team6-web/assets/141830897/9487b0a8-3b4f-4502-a324-9c65017d4de2)|![responsive_login](https://github.com/wafflestudio21-5/team6-web/assets/141830897/52193973-0683-4a20-8565-0429595f22d9)
|
|유저|보관함|로그인 모달|
<br></br>

## 🚀 기능 정리

- 🎥 다양한 기준으로 **영화 캐러셀** 제공 : 일일 박스 오피스 순위와 최신 영화, 그리고 TEAM6 팀원이 직접 선정한 Team6's pick 캐러셀이 있습니다. 메인 페이지에 한해 **스켈레톤 UI**가 구현되어 있습니다!

- 👑 동적 타이틀 변경 : 각 페이지로 이동할때마다 페이지의 맥락에 맞게 웹페이지 타이틀을 수정하는 기능을 구현하였습니다. 커스텀 훅을 만들었습니다.

- 📊 **영화 별 정보** 제공 : 기본정보, 줄거리, 포스터, 출연진 등
- ⭐ **별점 매기기(Rating) 및 코멘트** 작성
- ✅ 코멘트 작성 시 **스포일러 체크** 기능 : 체크 시에는 코멘트 목록과 코멘트 개별 페이지에서 "이 코멘트에는 스포일러가 포함되어 있습니다." 문구를 대신 보여줍니다.
- 📚 영화 별 **코멘트 목록** : 좋아요 / 최신 / 높은 별점 / 낮은 별점 순으로 정렬이 가능합니다. 와플피디아 내의 코멘트 목록은 모두 infinite-scroll로 구현하였습니다.
- 👍 개별 코멘트에 대한 **댓글 및 좋아요 반응** 기능 : 댓글 좋아요 기능도 있습니다!
- 🙋‍♂️ 유저별로 **다양한 하위 페이지** 기능 제공

  - 유저의 팔로잉, 팔로워 목록
  - 유저가 별점을 매긴 영화 목록
  - 유저가 작성한 코멘트 목록(infinite-scroll)
  - 유저의 영화 보관함

    - 보는 중 영화 목록
    - 보고싶어요 영화 목록

  - 유저가 좋아요한 코멘트 목록(로그인한 유저 자신의 계정 페이지에서만 확인 가능합니다.)

- 🧑 유저 Profile 편집 : 닉네임, 소개글, 대표 이미지와 배경 이미지 편집이 가능합니다.

- 🔎 영화 및 유저 **검색** : 헤더에서 직접 검색할 수 있고 모바일의 경우 검색 페이지로 이동하여 검색 가능합니다. 로컬 스토리지를 이용해 최근 검색어를 확인할 수 있습니다!

- 🤝 유저에 대한 **팔로잉 및 팔로워** 기능 : 로그인한 유저는 다른 유저를 팔로잉 할 수 있고, 팔로잉, 팔로워 목록은 유저페이지에서 확인할 수 있습니다.

- 🌐 소셜로그인 : 카카오톡 소셜로그인이 가능합니다.
  <br></br>

## 🎨 특별 기능

### 최근 구경한 영화 보관함

![page_main_hover](https://github.com/wafflestudio21-5/team6-web/assets/141830897/ce809183-50d5-433d-aa76-845818026ec9)

**최근 구경한 영화 보관함** 서비스는 여러 영화 페이지를 사용자가 구경하고 관람한 기록을 모아놓고 다시 확인할 수 있게 합니다. 페이지 우측 중단부의 버튼을 호버하면 와플피디아를 이용하면서 구경한 영화들을 확인할 수 있습니다!
로컬 스토리지를 이용하여 구현하였습니다.
