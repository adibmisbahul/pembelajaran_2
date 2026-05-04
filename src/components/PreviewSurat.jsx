export default function PreviewSurat({ data, styleType }) {
  return (
    <div className={`surat ${styleType}`}>
      <p className="kops surat" style={{ fontWeight: 600 }}>
        PT INDONESIA FASHION
      </p>
      <p className="header">{data.nama}</p>
      <p>{data.alamat}</p>
      <p>{data.tanggal}</p>

      <br />

      <p>
        <strong>Kepada Yth:</strong>
      </p>
      <p>{data.tujuan}</p>

      <p className="isi">{data.isi}</p>

      <p className="penutup">{data.penutup}</p>
    </div>
  );
}
