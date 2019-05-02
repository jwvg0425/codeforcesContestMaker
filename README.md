# codeforces contest maker

코드포스 API를 이용해서, 1. 주어진 유저들 중 누구도 풀지 않았으며(공개된 제출 기준 - 그룹 등 제출 자체가 비공개인 경우 codeforces API가 이 목록을 가져오는 걸 지원하지 않아서 사용할 수 없습니다), 2. 지정된 난이도의 문제로 구성되었고 3. used 목록에 포함된 문제는 사용하지 않는 랜덤 컨테스트 셋을 만듭니다.

## prerequisite
- nodejs
- npm or yarn 등의 패키지 매니저

## install

```
npm install
```

혹은

```
yarn install
```


## HOW TO USE

커스텀하게 설정 파일 이름을 지정해서 쓰고 싶은 경우,

```
node index.js used.txt user.txt diff.txt
node index.js used.txt user.txt diff.txt shuffle
```

기본 파일이름인 used.txt user.txt diff.txt를 그대로 이용할 경우,

```
npm run select
npm run select shuffle
```

혹은

```
yarn select
yarn select shuffle
```

- used.txt : 사용한 문제 목록입니다. 이 문제 목록에 포함된 문제는 사용하지 않습니다. 한 줄에 하나씩, 해당 문제의 컨테스트 ID와 문제 번호를 조합해서 기록합니다.
  - 예시: https://codeforces.com/problemset/problem/556/D 문제를 제외하고 싶은 경우, used.txt에 556D 를 추가.

- user.txt : 유저 목록입니다. 이 목록에 포함된 사용자가 맞춘 적 없는 문제만이 선택됩니다.
  - 예시: hyunuk 이라는 아이디를 가진 유저가 푼 문제를 제외하고 싶은 경우, user.txt에 hyunuk을 추가.

- diff.txt : 뽑을 문제의 난이도 목록입니다. 각 난이도의 문제가 하나씩 랜덤하게 선택됩니다.
  - 예시: 난이도가 2000, 2100, 2200인 문제를 각각 하나씩 넣고 싶다면 diff.txt에 `2000 2100 2200`을 기록

- shuffle : 마지막 인자로 shuffle을 주면 문제 목록을 섞어서 반환합니다. 그렇지 않을 경우, diff.txt에 기록한 난이도 순서대로 문제를 골라서 반환합니다.

현재, 이상한 문제들을 최대한 제외하기 위해

- problemset 번호가 400이상이면서,
- 태그에 special problem을 포함하지 않는 문제

만 고르게 되어있습니다. 그래도 한 번씩 이상한 문제가 끼긴 하네요..

## TO DO

- 문제 태그 기반 문제 선정
- 난이도 범위 기반 문제 선정
- 설정 좀 더 쉽게 하기
- 특정 범위의 대회들만 고르기
- 이상한 대회들 좀 더 필터링하기
