# 🎥 와플피디아 🎥

🧇[**와플피디아**](https://d1vexdz72u651e.cloudfront.net/) 는 [**왓챠피디아 웹사이트**](https://pedia.watcha.com/ko-KR/)의 클론 프로젝트입니다! 기존의 왓챠피디아는 영화와 책, TV 프로그램에 대해 추천을 받을 수 있고, 자신의 관람평과 별점을 공유하여 다른 유저와 소통하는 **콘텐츠 추천 & 의견 커뮤니티 웹서비스** 입니다. 저희 TEAM6 팀원들은 개발기간과 서로의 역량을 고려하여, 와플피디아를 **영화 콘텐츠에 대한 의견 커뮤니티 서비스**에 집중하는, 그러나 핵심적이고 필수적인 기능들을 내실 있게 제공하는 웹서비스로 완성하고자 하였습니다. 많이 부족하지만 열과 성을 다해 제작한 저희 와플피디아 서비스를 만족스럽게 사용하실 수 있기를 바랍니다🙏🙏

개발 기간 : 23.12.28 ~ 24.02.02

\*본 레포는 **TEAM6-WEB REPO** 이므로 리액트를 이용한 FRONTEND 개발에 관한 내용을 위주로 설명합니다. BACKEND 개발 내용에 관해 궁금하시다면? [TEAM6-SERVER REPO](https://github.com/wafflestudio21-5/team6-server)

## 💻 배포

프론트엔드 서버 도메인(Web server) : <https://d1vexdz72u651e.cloudfront.net/>

백엔드 서버 도메인(Api server) : <https://wafflepedia.xyz/>

웹서버의 경우 AWS S3 + CLOUDFRONT를 이용하여 배포하였습니다.

## 🙋‍♂️ 개발팀 & 역할 분담

오수현 [@ohsuhyeon0119](https://github.com/ohsuhyeon0119)

- 팀장 역할 수행 및 일정 관리
- 유저 페이지 및 유저 하위 페이지 디자인&기능 / 인증 서비스 구현

박민철 [@ComPhyPark](https://github.com/ComPhyPark)

- 랜딩 페이지 디자인&기능 구현
- 웹서비스의 전체적인 버그 수정

정우진 [izone00](https://github.com/izone00)

- 영화 개별 페이지 및 콘텐츠 하위 페이지들에 대한 전반적인 디자인&기능 구현
- 와플피디아만의 추가 서비스 (내가 구경한 영화 모음 보관함) 구현

## 🔧 Stacks

#### 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> &nbsp; &nbsp; &nbsp; <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/cssmodules-000000?style=for-the-badge&logo=cssmodules&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white">

#### 협업

<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">

## 📃 주요 PAGE & MODAL 소개

|                                                                                                                                    |                                                                                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|         ![page_main](https://github.com/wafflestudio21-5/team6-web/assets/141830897/79fabfbc-98ef-4d61-b08d-e5ea55accf68)          |      ![page_content](https://github.com/wafflestudio21-5/team6-web/assets/141830897/c1adf20f-4971-4f7a-b8ab-0666ad1b495c)       |
|                                                            메인 페이지                                                             |                                                         개별 영화페이지                                                         |
|   **_박스오피스_** 순위와 **_최신 영화_**, 그리고 **_team6 팀원들이 직접 선정한 영화 목록_**에 대한 캐러셀을 제공하고 있습니다.    | 각 영화별로 영화에 대한 기본 데이터(줄거리, 포스터 등)를 제공하고, 유저는 별점을 매기거나 코멘트로 감상평을 작성할 수 있습니다. |
|                                                      영화별 코멘트 작성 모달                                                       |                                                       개별 코멘트 페이지                                                        |
|         ![moda_write](https://github.com/wafflestudio21-5/team6-web/assets/141830897/ad1840e1-b75f-4e9f-955e-753bc1d0c338)         |      ![page_comment](https://github.com/wafflestudio21-5/team6-web/assets/141830897/80d9fe4a-be09-468a-887e-16b00c94b14d)       |
| 각 영화에 대해 코멘트를 작성할 수 있습니다. 코멘트가 스포일러를 포함하는 지 여부를 체크할 수 있고, 이에 따라 관련 UI가 달라집니다. |   대상 영화를 포함한 코멘트 정보와, 코멘트에 달리는 댓글 목록이 제공됩니다. 댓글을 자유롭게 작성, 수정, 삭제 할 수 있습니다.    |
|                                                        코멘트 리스트 페이지                                                        |                                                           검색 페이지                                                           |
|      ![page_commentList](https://github.com/wafflestudio21-5/team6-web/assets/141830897/9afea23d-b32e-4608-8273-0b8d37456ab2)      |       ![page_search](https://github.com/wafflestudio21-5/team6-web/assets/141830897/1f1501ac-fa59-4b96-b3a5-bb6e61eef352)       |
|           영화 개별 / 내가 작성한 코멘트 별 / 내가 좋아한 코멘트 별로 목록이 제공됩니다. 정렬 방식을 선택할 수 있습니다.           |                                           영화 & 유저에 대한 통합 검색이 가능합니다.                                            |
|                                                            유저 페이지                                                             |                                                        Profile 편집 모달                                                        |
|         ![page_user](https://github.com/wafflestudio21-5/team6-web/assets/141830897/69770940-19f7-49d5-87fb-5ed5e5104181)          |      ![modal_profile](https://github.com/wafflestudio21-5/team6-web/assets/141830897/482d3932-0934-4597-8d4a-68a1ba7b724e)      |
|                               로그인한 본인 계정 & 다른 계정의 유저 관련 정보를 확인할 수 있습니다.                                |                                   닉네임, 설명글, 배경 사진, 대표 사진을 변경할 수 있습니다.                                    |
|                                                   유저가 평가한 영화 목록 페이지                                                   |                                                    유저의 영화 보관함 페이지                                                    |
|        ![page_rating](https://github.com/wafflestudio21-5/team6-web/assets/141830897/ce83a2be-1251-4131-9dbc-95daa3d51785)         |      ![page_storage](https://github.com/wafflestudio21-5/team6-web/assets/141830897/2614d989-82b6-4d3a-9830-6db9439be3d3)       |
|      유저가 별점을 매긴 영화 목록을 확인할 수 있습니다. 별점 순 탭으로 이동하면 각 별점 별로 영화 목록을 확인할 수 있습니다.       |              평가 영화 목록 / 보고 싶어요로 등록한 영화 목록 / 보는 중으로 등록한 영화 목록 을 확인할 수 있습니다.              |
|                                                           유저 설정 모달                                                           |                                                            인증모달                                                             |
|           ![image](https://github.com/wafflestudio21-5/team6-web/assets/141830897/399655bf-7bba-4f80-8a18-bf85e41ea30a)            |       ![modal_login](https://github.com/wafflestudio21-5/team6-web/assets/141830897/8be99c0d-7665-4e1d-b85a-8cf0296ec28b)       |
|                                프로필 공유(클립보드 복사) / 로그아웃 / 회원탈퇴 기능이 제공됩니다.                                 |                                  로그인 & 회원가입 모달이 있고 카카오 소셜로그인이 가능합니다.                                  |

## 모바일 반응형(여기는 표로)

## 기능 정리

웹 사이트 기능을 정리합니다....!
