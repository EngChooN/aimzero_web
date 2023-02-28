import dynamic from "next/dynamic";
// import BoardWrite from "../../components/Main/Board/Write/BoardWrite";

const BoardWrite = dynamic(
  () => import("../../components/Main/Board/Write/BoardWrite"),
  {
    ssr: false,
  }
);

export default function BoardWritePage() {
  return <BoardWrite />;
}
