import FullPageScroll, {
    FullPageElement,
} from "@/components/commons/FullPageScroll/FullPageScroll";

export default function OnePageLibraryPage() {
    const pageSection = [
        <FullPageElement style={{ background: "red" }}></FullPageElement>,
        <FullPageElement style={{ background: "green" }}></FullPageElement>,
        <FullPageElement style={{ background: "blue" }}></FullPageElement>,
        <FullPageElement style={{ background: "yellow" }}></FullPageElement>,
    ];

    return <FullPageScroll pageSection={pageSection} />;
}
