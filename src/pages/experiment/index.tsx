import Link from "next/link";

export default function ExperimentPage() {
    return (
        <div>
            <p>Experiment</p>
            <Link href={"/experiment/make+commit"}>커밋메시지만들기</Link>
        </div>
    );
}
