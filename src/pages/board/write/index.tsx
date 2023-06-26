import dynamic from "next/dynamic";

const BoardWrite = dynamic(
    () => import("../../../components/Main/Board/Write/BoardWrite"),
    {
        ssr: false,
    }
);

export default function BoardWritePage() {
    return <BoardWrite />;
}
