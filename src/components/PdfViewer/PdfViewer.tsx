import { Document, Page, pdfjs } from "react-pdf";

export default function (props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <Document
      file={`images/about/pdf/${props.url}`} // yout pdf url
    >
      <Page height={800} pageNumber={1} />
    </Document>
  );
}
