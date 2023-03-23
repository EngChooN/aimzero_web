import { Document, Page, pdfjs } from "react-pdf";

export default function (props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <Document
      file={`images/about/pdf/good.pdf`} // 여기는 가지고 계신 pdf 주소
    >
      <Page height={500} pageNumber={1} />
    </Document>
  );
}
