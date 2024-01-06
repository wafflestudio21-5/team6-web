# team6-web

# WafflePedia (왓챠피디아 클론코딩 팀프로젝트)

## 프로젝트 소개

왓챠피디아 웹서비스 클론 코딩 팀프로젝트의 웹서버 레포입니다.

배포 도메인 : <https://d1vexdz72u651e.cloudfront.net/>

개발 기간 : 2023.12.28 ~

## 배포 방식

cloudfront + s3 으로 배포 관리하며, github actions으로 main에 push 시 자동 빌드 및 배포

## 기술스택

- REACT
- Typescript
- scss + css module

## CONVENTION

### 코드

- CSS는 카멜케이스로 네이밍한다. #.module.scss 파일을 컴포넌트 파일에 styles 로 import한 뒤, scss 내의 클래스네임을 컴포넌트 파일에서 styles. 으로 접근하여 사용

### 협업

- 화면 flow는 figma에서 관리하고, FE가 구현해야 할 특별한 기능의 경우 각 화면 페이지 별로 내용과 의견을 적어준다.
- 분담한 작업은 왓챠피디아 웹페이지와 따로 정리한 기능 명세서를 참고하여 구현한다.
- 주 1회의 공통 회의와 별도로 FE 개별 회의 1회를 비대면(슬랙 허들)로 진행한다.

## 깃 관련

- github-flow 방식을 차용한다. main이 배포 브랜치이며, 각 작업은 개별 브랜치(ex. feat/example )를 로컬에서 만들어 진행한다.

- 작업이 끝나면 로컬->원격으로 push를 하고 main에 PR을 올린다. PR을 올린 직후에는 SLACK에 정해진 양식에 맞추어 나머지 팀원에게 알려준다.

- PR을 올린 날 기준 익일 오전 10시까지 각 팀원은 리뷰를 진행하고, 리뷰가 없거나 리뷰 내의 특별한 사항이 없을 시에, PR을 올린 팀원이 스스로 main에 머지한다. 리뷰에 따라 변경해야 할 코드가 있다면 변경 후 원격에 push 한 뒤 재리뷰를 요청한다.

- 특이 사항이 없는 이상 PR 머지 시 squash & merge를 사용한다.

- main에 merge가 이루어진 후에는 slack에서 팀원들에게 merge를 완료하였음을 알려준다. 나머지 팀원은 변경된 원격의 main을 로컬에 반영하도록 한다. 즉 remote main branch -> local branch로 pull하여 최신화

- 작업 중인 브랜치가 feat/example2 인 경우 main -> feat/example2로 머지한다. conflict 발생 시 논의하여 수정하고 다시 작업을 이어나간다.
  <- PR시의 conflict를 최대한 방지하려는 의도입니다>

**local main branch -> remote main branch push 하지 말 것**
