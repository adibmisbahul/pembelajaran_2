import { useState, useRef } from "react";
import "./GeneratorSurat.css";

const STYLES = [
  "Full Block",
  "Block",
  "Semi Block",
  "Indented",
  "Hanging Paragraph",
  "Official",
];

const defaultData = {
  companyName: "PT Indonesia Fashion",
  companyAddress: "Jalan Garuda Merdeka Nomor 109, Surabaya",
  companyPhone: "(022) 6030612",
  companyEmail: "info@indonesiakreatif.sch.id",
  companyWebsite: "www.jayasejahteracipta.co.id",
  letterNumber: "0048/IF-KP/VI/2025",
  attachment: "-",
  subject: "Konfirmasi Pesanan",
  date: "5 Juni 2025",
  recipientTitle: "Yth. Ibu Annisa Nuraini",
  recipientRole: "Pimpinan PT Arjuna Utama",
  recipientAddress: "Jalan Melati 25, Gamping, Sleman",
  opening: "Dengan hormat,",
  body: `Kami telah menerima surat pesanan saudara nomor 125/AU-P/VI/2025 tertanggal 3 Juni 2025. Dengan ini, kami bermaksud untuk memastikan produk yang Saudara pesan yakni sebagai berikut:\n\n1. Blouse Wanita Formal size L sebanyak 30 pcs.\n2. Kemeja Linen size L sebanyak 20 pcs.\n3. Rok A-Line size L sebanyak 50 pcs.\n\nKami pastikan bahwa pesanan tersebut akan segera kami proses sesuai dengan spesifikasi dan jadwal pengiriman yang tertera dalam surat pesanan. Tim produksi dan logistik kami telah dijadwalkan untuk mulai penanganan sejak tanggal 6 Juni 2025.\n\nProduk akan kami kirim 3 hari kerja setelah pembayaran kami terima. Pembayaran harus dilakukan melalui transfer ke rekening a.n. Santosa Cahyadi (0076234567819). Jika terdapat produk yang cacat atau rusak, Saudara dapat melakukan retur selambat-lambatnya 7 hari setelah produk diterima.\n\nDemikian surat konfirmasi pesanan ini kami sampaikan. Atas kerjasama, Saudara kami ucapkan terima kasih`,
  closing: "Hormat kami,",
  signerName: "Santosa Cahyadi, M. Sc.",
  signerTitle: "Manajer Pemasaran",
  letterStyle: "Full Block",
};

// ─────────────────────────────────────────────
// LetterPreview
// ─────────────────────────────────────────────
function LetterPreview({ data }) {
  const style = data.letterStyle;
  const isFullBlock = style === "Full Block";
  const isBlock = style === "Block";
  const isSemiBlock = style === "Semi Block";
  const isIndented = style === "Indented";
  const isHanging = style === "Hanging Paragraph";
  const isOfficial = style === "Official";

  // Right-align closing/sig for Block, Semi Block, Indented, Hanging, Official
  const rightAlign = isBlock || isSemiBlock || isIndented || isHanging || isOfficial;
  // Paragraph indent for Semi Block, Indented, Hanging, Official
  const paraIndent = isSemiBlock || isIndented || isHanging || isOfficial;

  const bodyParagraphs = data.body.split("\n\n");

  const renderParagraph = (para, idx) => {
    const lines = para.split("\n");
    const isNumberedList = lines.every((l) => /^\d+\./.test(l.trim()));

    if (isNumberedList) {
      return (
        <div key={idx} className="numbered-list">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`numbered-list-item${paraIndent || isHanging ? " numbered-list-item--indent" : ""}`}
            >
              {line}
            </div>
          ))}
        </div>
      );
    }

    if (isHanging) {
      return (
        <div key={idx} className="hanging-para">
          <div className="hanging-para__inner">
            <div>{lines[0]}</div>
            {lines.slice(1).map((line, i) => (
              <div key={i} className="hanging-continuation">
                {line}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <p key={idx} className={paraIndent ? "para-indent" : ""}>
        {para}
      </p>
    );
  };

  return (
    <div className="letter">
      {/* Letterhead */}
      <div className="letterhead">
        <div className="letterhead__logo">IF</div>
        <div className="letterhead__info">
          <div className="letterhead__company">{data.companyName}</div>
          <div className="letterhead__address">{data.companyAddress}</div>
          <div className="letterhead__phone">
            Telepon/Faksimile: {data.companyPhone}
          </div>
          <div className="letterhead__contact">
            E-mail:{" "}
            <span className="letterhead__link">{data.companyEmail}</span>
            , Website:{" "}
            <span className="letterhead__link">{data.companyWebsite}</span>
          </div>
        </div>
      </div>

      {/* Date & Letter Info */}
      {isFullBlock ? (
        <div className="letter-meta letter-meta--full-block">
          <div className="meta-date">{data.date}</div>
          <table>
            <tbody>
              <tr>
                <td>Nomor</td>
                <td>:</td>
                <td>{data.letterNumber}</td>
              </tr>
              <tr>
                <td>Lampiran</td>
                <td>:</td>
                <td>{data.attachment}</td>
              </tr>
              <tr>
                <td>Perihal</td>
                <td>:</td>
                <td>{data.subject}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="letter-meta letter-meta--split">
          <table>
            <tbody>
              <tr>
                <td className="meta-left">
                  <table>
                    <tbody>
                      <tr>
                        <td>Nomor</td>
                        <td>:</td>
                        <td>{data.letterNumber}</td>
                      </tr>
                      <tr>
                        <td>Lampiran</td>
                        <td>:</td>
                        <td>{data.attachment}</td>
                      </tr>
                      <tr>
                        <td>Perihal</td>
                        <td>:</td>
                        <td>{data.subject}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="meta-right">{data.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Recipient */}
      {isOfficial ? (
        <div className="letter-recipient letter-recipient--official">
          <div className="recipient-spacer" />
          <div className="recipient-block">
            <div>{data.recipientTitle}</div>
            <div>{data.recipientRole}</div>
            <div>{data.recipientAddress}</div>
          </div>
        </div>
      ) : (
        <div className="letter-recipient">
          <div>{data.recipientTitle}</div>
          {isIndented ? (
            <>
              <div className="recipient-indent-1">{data.recipientRole}</div>
              <div className="recipient-indent-2">{data.recipientAddress}</div>
            </>
          ) : (
            <>
              <div>{data.recipientRole}</div>
              <div>{data.recipientAddress}</div>
            </>
          )}
        </div>
      )}

      {/* Opening */}
      <div className="letter-opening">{data.opening}</div>

      {/* Body */}
      <div className="letter-body">
        {bodyParagraphs.map((para, idx) => renderParagraph(para, idx))}
      </div>

      {/* Closing & Signature */}
      <div className={`letter-closing letter-closing--${rightAlign ? "right" : "left"}`}>
        <div>{data.closing}</div>
        <div className="letter-closing__name">
          <div>{data.signerName}</div>
          <div style={{ fontWeight: "normal" }}>{data.signerTitle}</div>
        </div>
      </div>

      {/* Style Label */}
      <div className="letter-style-label">-{style.toLowerCase()} style</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Field (reusable input)
// ─────────────────────────────────────────────
function Field({ label, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function GeneratorSurat() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState("company");
  const printRef = useRef();

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const tabs = [
    { id: "company", label: "Kop Surat" },
    { id: "meta", label: "Info Surat" },
    { id: "recipient", label: "Penerima" },
    { id: "body", label: "Isi Surat" },
    { id: "sign", label: "Tanda Tangan" },
  ];

  const handleDownload = () => {
    const content = printRef.current;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Surat - ${data.subject}</title>
          <style>
            *, *::before, *::after { box-sizing: border-box; }

            body {
              margin: 0;
              padding: 32px 48px;
              font-family: 'Times New Roman', Times, serif;
              font-size: 11pt;
              color: #1a1a1a;
              background: white;
            }

            @media print {
              body { padding: 20mm 25mm; }
            }

            /* ---- Letter shell ---- */
            .letter {
              font-family: 'Times New Roman', Times, serif;
              font-size: 11pt;
              color: #1a1a1a;
              line-height: 1.5;
              width: 100%;
            }

            /* ---- Letterhead ---- */
            .letterhead {
              display: flex;
              align-items: center;
              border-bottom: 3px double #1a1a1a;
              padding-bottom: 10px;
              margin-bottom: 14px;
              gap: 14px;
            }
            .letterhead__logo {
              width: 52px;
              height: 52px;
              flex-shrink: 0;
              background: linear-gradient(135deg, #1a6b3c 40%, #f5a623 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 13px;
              letter-spacing: -1px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .letterhead__info {
              flex: 1;
              text-align: center;
            }
            .letterhead__company {
              font-weight: bold;
              font-size: 13pt;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .letterhead__address,
            .letterhead__phone,
            .letterhead__contact {
              font-size: 9.5pt;
            }
            .letterhead__link {
              color: #1a56db;
              text-decoration: underline;
            }

            /* ---- Letter meta ---- */
            .letter-meta { margin-bottom: 14px; }
            .letter-meta table { border-collapse: collapse; }
            .letter-meta td { padding: 0; }
            .letter-meta td:first-child { padding-right: 8px; }
            .letter-meta td:nth-child(2) { padding-right: 8px; }
            .letter-meta--full-block .meta-date { margin-bottom: 8px; }
            .letter-meta--split table { width: 100%; border-collapse: collapse; }
            .letter-meta--split .meta-left { width: 50%; }
            .letter-meta--split .meta-right { text-align: right; vertical-align: top; }

            /* ---- Recipient ---- */
            .letter-recipient { margin-bottom: 14px; }
            .letter-recipient--official {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 14px;
            }
            .letter-recipient--official .recipient-spacer { width: 50%; }
            .letter-recipient--official .recipient-block { text-align: right; }
            .recipient-indent-1 { padding-left: 20px; }
            .recipient-indent-2 { padding-left: 40px; }

            /* ---- Opening ---- */
            .letter-opening { margin-bottom: 14px; }

            /* ---- Body ---- */
            .letter-body { margin-bottom: 14px; }
            .letter-body p {
              margin: 0 0 14px 0;
              text-align: justify;
              line-height: 1.7;
            }
            .letter-body p.para-indent { text-indent: 40px; }
            .numbered-list { margin-bottom: 12px; }
            .numbered-list-item { margin-bottom: 2px; }
            .numbered-list-item--indent { padding-left: 32px; }
            .hanging-para { margin-bottom: 14px; display: flex; align-items: flex-start; }
            .hanging-para__inner { min-width: 0; flex: 1; }
            .hanging-continuation { padding-left: 40px; }

            /* ---- Closing ---- */
            .letter-closing { margin-top: 20px; }
            .letter-closing--left { text-align: left; }
            .letter-closing--right { text-align: right; }
            .letter-closing__name { margin-top: 48px; font-weight: bold; }

            /* ---- Style label ---- */
            .letter-style-label {
              margin-top: 24px;
              font-style: italic;
              font-size: 9pt;
              color: #888;
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        <div>
          <div className="app-header__title">✉ Pembuat Surat Niaga</div>
          <div className="app-header__subtitle">
            Generator surat bisnis Indonesia profesional
          </div>
        </div>
        <button className="btn-download" onClick={handleDownload}>
          ⬇ Unduh / Cetak
        </button>
      </header>

      <div className="app-body">
        {/* Form Panel */}
        <aside className="form-panel">
          {/* Style Selector */}
          <div className="style-selector">
            <label className="field-label">Gaya / Style Surat</label>
            <select
              value={data.letterStyle}
              onChange={set("letterStyle")}
              className="form-select"
            >
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <nav className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn${activeTab === tab.id ? " tab-btn--active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Form Fields */}
          <div className="form-fields">
            {activeTab === "company" && (
              <>
                <Field label="Nama Perusahaan" value={data.companyName} onChange={set("companyName")} />
                <Field label="Alamat Perusahaan" value={data.companyAddress} onChange={set("companyAddress")} />
                <Field label="Telepon/Faksimile" value={data.companyPhone} onChange={set("companyPhone")} />
                <Field label="Email" value={data.companyEmail} onChange={set("companyEmail")} />
                <Field label="Website" value={data.companyWebsite} onChange={set("companyWebsite")} />
              </>
            )}

            {activeTab === "meta" && (
              <>
                <Field label="Nomor Surat" value={data.letterNumber} onChange={set("letterNumber")} />
                <Field label="Lampiran" value={data.attachment} onChange={set("attachment")} />
                <Field label="Perihal" value={data.subject} onChange={set("subject")} />
                <Field label="Tanggal" value={data.date} onChange={set("date")} />
              </>
            )}

            {activeTab === "recipient" && (
              <>
                <Field label="Nama Penerima (dengan gelar)" value={data.recipientTitle} onChange={set("recipientTitle")} />
                <Field label="Jabatan / Perusahaan" value={data.recipientRole} onChange={set("recipientRole")} />
                <Field label="Alamat Penerima" value={data.recipientAddress} onChange={set("recipientAddress")} />
                <Field label="Salam Pembuka" value={data.opening} onChange={set("opening")} />
              </>
            )}

            {activeTab === "body" && (
              <div className="field">
                <label className="field-label">Isi Surat</label>
                <textarea
                  value={data.body}
                  onChange={set("body")}
                  rows={16}
                  className="form-textarea"
                />
                <div className="form-hint">
                  Gunakan baris kosong untuk memisahkan paragraf. Daftar
                  bernomor dimulai dengan "1."
                </div>
              </div>
            )}

            {activeTab === "sign" && (
              <>
                <Field label="Salam Penutup" value={data.closing} onChange={set("closing")} />
                <Field label="Nama Penandatangan" value={data.signerName} onChange={set("signerName")} />
                <Field label="Jabatan Penandatangan" value={data.signerTitle} onChange={set("signerTitle")} />
              </>
            )}
          </div>
        </aside>

        {/* Preview Panel */}
        <main className="preview-panel">
          <div className="preview-toolbar">
            <span className="preview-badge">{data.letterStyle} Style</span>
            <span className="preview-label">Pratinjau langsung</span>
          </div>

          <div className="paper">
            <div ref={printRef}>
              <LetterPreview data={data} />
            </div>
          </div>

          <p className="preview-footer">
            Klik "Unduh / Cetak" di atas untuk menyimpan atau mencetak surat
          </p>
        </main>
      </div>
    </div>
  );
}
