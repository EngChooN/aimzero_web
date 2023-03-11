This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

https://aimzero-web.vercel.app/ 

## Tree
```
src
 ┣ common
 ┃ ┣ Recoil
 ┃ ┃ ┣ languageState.ts
 ┃ ┃ ┣ loginState.ts
 ┃ ┃ ┗ userInfoState.ts
 ┃ ┗ ts
 ┣ components
 ┃ ┣ Landing_old
 ┃ ┃ ┣ Landing.styles.ts
 ┃ ┃ ┗ Landing.tsx
 ┃ ┣ Layout
 ┃ ┃ ┣ Footer
 ┃ ┃ ┃ ┗ Footer.tsx
 ┃ ┃ ┣ Header
 ┃ ┃ ┃ ┗ Header.tsx
 ┃ ┃ ┗ Layout.tsx
 ┃ ┣ LocaleButton
 ┃ ┃ ┗ LocaleButton.tsx
 ┃ ┣ Login
 ┃ ┃ ┣ Login.container.tsx
 ┃ ┃ ┣ Login.presenter.tsx
 ┃ ┃ ┗ Login.styles.ts
 ┃ ┣ Main
 ┃ ┃ ┣ Board
 ┃ ┃ ┃ ┣ BoardViewer
 ┃ ┃ ┃ ┃ ┗ BoardViewer.tsx
 ┃ ┃ ┃ ┣ Edit
 ┃ ┃ ┃ ┃ ┣ BoardEdit.styles.ts
 ┃ ┃ ┃ ┃ ┗ BoardEdit.tsx
 ┃ ┃ ┃ ┣ Write
 ┃ ┃ ┃ ┃ ┣ BoardWrite.styles.ts
 ┃ ┃ ┃ ┃ ┗ BoardWrite.tsx
 ┃ ┃ ┃ ┣ Board.styles.ts
 ┃ ┃ ┃ ┗ Board.tsx
 ┃ ┃ ┣ Main.styles.ts
 ┃ ┃ ┗ Main.tsx
 ┃ ┣ NoPage
 ┃ ┃ ┗ NoPage.tsx
 ┃ ┣ Photo
 ┃ ┃ ┣ Photo.container.tsx
 ┃ ┃ ┣ Photo.presenter.tsx
 ┃ ┃ ┗ Photo.styles.ts
 ┃ ┣ Reply
 ┃ ┃ ┣ Edit
 ┃ ┃ ┃ ┗ ReplyEdit.tsx
 ┃ ┃ ┣ Viewer
 ┃ ┃ ┃ ┗ ReplyViewer.tsx
 ┃ ┃ ┣ Write
 ┃ ┃ ┃ ┗ ReplyWrite.tsx
 ┃ ┃ ┣ Reply.styles.ts
 ┃ ┃ ┗ Reply.tsx
 ┃ ┣ Signup
 ┃ ┃ ┣ Signup.container.tsx
 ┃ ┃ ┣ Signup.presenter.tsx
 ┃ ┃ ┗ Signup.styles.ts
 ┃ ┗ VisitLog
 ┃ ┃ ┣ VisitLog.styles.ts
 ┃ ┃ ┗ VisitLog.tsx
 ┣ pages
 ┃ ┣ about
 ┃ ┃ ┗ index.tsx
 ┃ ┣ board
 ┃ ┃ ┣ [boardID]
 ┃ ┃ ┃ ┣ edit
 ┃ ┃ ┃ ┃ ┗ index.tsx
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┃ ┗ write
 ┃ ┃ ┃ ┗ index.tsx
 ┃ ┣ login
 ┃ ┃ ┗ index.tsx
 ┃ ┣ photo
 ┃ ┃ ┗ index.tsx
 ┃ ┣ projects
 ┃ ┃ ┗ index.tsx
 ┃ ┣ signup
 ┃ ┃ ┗ index.tsx
 ┃ ┣ skills
 ┃ ┃ ┗ index.tsx
 ┃ ┣ visit+log
 ┃ ┃ ┗ index.tsx
 ┃ ┣ _app.tsx
 ┃ ┗ index.tsx
 ┣ styles
 ┃ ┗ globals.css
 ┗ .DS_Store
```
