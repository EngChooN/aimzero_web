import { Document, Page, pdfjs } from "react-pdf";

export default function (props: { url: string }) {
    const { url } = props;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
        <Document
            file={`images/about/pdf/${url}`} // your pdf url
        >
            <Page pageNumber={1} />
        </Document>
    );
}
