# ansi-nametags

안시의 명찰 제작을 위한 레포지토리입니다.

## 실행 방법

```bash
npm i
npm run dev
```

- [http://localhost:3000/apc](http://localhost:3000/apc) - APC 명찰입니다
- [http://localhost:3000/homecoming](http://localhost:3000/homecoming) - 홈커밍데이 명찰입니다

## 사용 방법

1. 수정해야할 부분은 csv 파일과 명찰의 크기입니다. 명찰의 크기는 실제 명찰의 크기보다 작게 해야 잘 들어갑니다. css에서 `cm` 등 실제 크기 단위를 이용하여 지정합니다.
2. 아무 브라우저에서 페이지를 띄운 후, 인쇄를 하면 됩니다. 배율은 100%로 합니다.
