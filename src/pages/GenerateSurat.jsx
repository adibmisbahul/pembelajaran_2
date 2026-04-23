import { useState } from "react";
import FormSurat from "../components/FormSurat";
import PreviewSurat from "../components/PreviewSurat";
import StyleSelector from "../components/StyleSelector";
import "../styles/styles.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
const GenerateSurat = () => {
  const previewRef = useRef();
  const [data, setData] = useState({
    nama: "",
    alamat: "",
    tujuan: "",
    isi: "",
    penutup: "",
    tanggal: "",
  });

  const [style, setStyle] = useState("full-block");

  const handleDownload = async () => {
    const element = previewRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save("surat.pdf");
  };

  return (
    <>
      <div className="container">
        <StyleSelector setStyle={setStyle} />

        <button className="btn-download" onClick={handleDownload}>
          Download Surat PDF
        </button>

        <div className="grid">
          <FormSurat data={data} setData={setData} />
          <div ref={previewRef}>
            <PreviewSurat data={data} styleType={style} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateSurat;
