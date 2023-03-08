import dynamic from "next/dynamic";

const BoardEdit = dynamic(
  () => import("../../../../components/Main/Board/Edit/BoardEdit"),
  { ssr: false }
);

export default function boardEditPage() {
  return <BoardEdit />;
}
