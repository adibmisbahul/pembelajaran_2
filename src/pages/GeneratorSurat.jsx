import { useState, useRef } from "react";

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

function LetterPreview({ data }) {
  const style = data.letterStyle;
  const isFullBlock = style === "Full Block";
  const isBlock = style === "Block";
  const isSemiBlock = style === "Semi Block";
  const isIndented = style === "Indented";
  const isHanging = style === "Hanging Paragraph";
  const isOfficial = style === "Official";

  // Right-align closing/sig for Block, Semi Block, Indented, Hanging, Official
  const rightAlign =
    isBlock || isSemiBlock || isIndented || isHanging || isOfficial;
  // Paragraph indent for Semi Block, Indented, Hanging, Official
  const paraIndent = isSemiBlock || isIndented || isHanging || isOfficial;
  // Address indent for Indented style
  const addrIndent = isIndented;
  // Hanging paragraph
  const hangingStyle = isHanging;

  const bodyParagraphs = data.body.split("\n\n");

  const renderParagraph = (para, idx) => {
    const lines = para.split("\n");
    const isNumberedList = lines.every((l) => /^\d+\./.test(l.trim()));

    if (isNumberedList) {
      return (
        <div key={idx} style={{ marginBottom: "12px" }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                paddingLeft: paraIndent || hangingStyle ? "32px" : "0",
                marginBottom: "2px",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      );
    }

    if (hangingStyle) {
      return (
        <div
          key={idx}
          style={{
            marginBottom: "14px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ textIndent: "0", marginBottom: "0" }}>{lines[0]}</div>
            {lines.slice(1).map((line, i) => (
              <div key={i} style={{ paddingLeft: "40px" }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <p
        key={idx}
        style={{
          marginBottom: "14px",
          textIndent: paraIndent ? "40px" : "0",
          margin: "0 0 14px 0",
          textAlign: "justify",
          lineHeight: "1.7",
        }}
      >
        {para}
      </p>
    );
  };

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "11pt",
        color: "#1a1a1a",
        lineHeight: "1.5",
        padding: "0",
        background: "white",
        width: "100%",
      }}
    >
      {/* Letterhead */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "3px double #1a1a1a",
          paddingBottom: "10px",
          marginBottom: "14px",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            flexShrink: 0,
            background: "linear-gradient(135deg, #1a6b3c 40%, #f5a623 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "13px",
            letterSpacing: "-1px",
          }}
        >
          IF
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "13pt",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {data.companyName}
          </div>
          <div style={{ fontSize: "9.5pt" }}>{data.companyAddress}</div>
          <div style={{ fontSize: "9.5pt" }}>
            Telepon/Faksimile: {data.companyPhone}
          </div>
          <div style={{ fontSize: "9.5pt" }}>
            E-mail:{" "}
            <span style={{ color: "#1a56db", textDecoration: "underline" }}>
              {data.companyEmail}
            </span>
            , Website:{" "}
            <span style={{ color: "#1a56db", textDecoration: "underline" }}>
              {data.companyWebsite}
            </span>
          </div>
        </div>
      </div>

      {/* Date & Letter Info */}
      {isFullBlock ? (
        <div style={{ marginBottom: "14px" }}>
          <div style={{ marginBottom: "8px" }}>{data.date}</div>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: "8px" }}>Nomor</td>
                <td style={{ paddingRight: "8px" }}>:</td>
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
        <div style={{ marginBottom: "14px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%" }}>
                  <table style={{ borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: "8px" }}>Nomor</td>
                        <td style={{ paddingRight: "8px" }}>:</td>
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
                <td style={{ textAlign: "right", verticalAlign: "top" }}>
                  {data.date}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Recipient */}
      {isOfficial ? (
        <div
          style={{
            marginBottom: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ width: "50%" }}></div>
          <div style={{ textAlign: "right" }}>
            <div>{data.recipientTitle}</div>
            <div>{data.recipientRole}</div>
            <div>{data.recipientAddress}</div>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "14px" }}>
          <div>{data.recipientTitle}</div>
          {isIndented ? (
            <>
              <div style={{ paddingLeft: "20px" }}>{data.recipientRole}</div>
              <div style={{ paddingLeft: "40px" }}>{data.recipientAddress}</div>
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
      <div style={{ marginBottom: "14px" }}>{data.opening}</div>

      {/* Body */}
      <div style={{ marginBottom: "14px" }}>
        {bodyParagraphs.map((para, idx) => renderParagraph(para, idx))}
      </div>

      {/* Closing & Signature */}
      <div
        style={{ marginTop: "20px", textAlign: rightAlign ? "right" : "left" }}
      >
        <div>{data.closing}</div>
        <div style={{ marginTop: "48px" }}>
          <div style={{ fontWeight: "bold" }}>{data.signerName}</div>
          <div>{data.signerTitle}</div>
        </div>
      </div>

      {/* Style Label */}
      <div
        style={{
          marginTop: "24px",
          fontStyle: "italic",
          fontSize: "9pt",
          color: "#888",
        }}
      >
        -{style.toLowerCase()} style
      </div>
    </div>
  );
}

export default function GeneratorSurat() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState("company");
  const printRef = useRef();

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const handleDownload = () => {
    const content = printRef.current;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Surat - ${data.subject}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
            body { margin: 0; padding: 32px 48px; font-family: 'Times New Roman', serif; font-size: 11pt; color: #1a1a1a; }
            @media print { body { padding: 20mm 25mm; } }
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

  const inputCls = {
    width: "100%",
    padding: "7px 10px",
    border: "1.5px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "inherit",
    background: "#fafafa",
    color: "#1a1a1a",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelCls = {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const tabs = [
    { id: "company", label: "Kop Surat" },
    { id: "meta", label: "Info Surat" },
    { id: "recipient", label: "Penerima" },
    { id: "body", label: "Isi Surat" },
    { id: "sign", label: "Tanda Tangan" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0ede8",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 100%)",
          padding: "18px 32px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: "800",
              fontSize: "20px",
              letterSpacing: "-0.5px",
            }}
          >
            ✉ Pembuat Surat Niaga
          </div>
          <div style={{ fontSize: "12px", opacity: 0.75, marginTop: "2px" }}>
            Generator surat bisnis Indonesia profesional
          </div>
        </div>
        <button
          onClick={handleDownload}
          style={{
            background: "#f5a623",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "8px",
            padding: "10px 22px",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            boxShadow: "0 2px 8px rgba(245,166,35,0.4)",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "translateY(-1px)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          ⬇ Unduh / Cetak
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "0",
          overflow: "hidden",
          maxHeight: "calc(100vh - 70px)",
        }}
      >
        {/* FORM PANEL */}
        <div
          style={{
            width: "360px",
            minWidth: "320px",
            background: "white",
            borderRight: "1.5px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Style Selector */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1.5px solid #e5e7eb",
              background: "#fafaf9",
            }}
          >
            <label style={labelCls}>Gaya / Style Surat</label>
            <select
              value={data.letterStyle}
              onChange={set("letterStyle")}
              style={{ ...inputCls, background: "white", cursor: "pointer" }}
            >
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1.5px solid #e5e7eb",
              background: "#fafaf9",
              overflowX: "auto",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: "1",
                  padding: "9px 4px",
                  border: "none",
                  background: activeTab === tab.id ? "white" : "transparent",
                  borderBottom:
                    activeTab === tab.id
                      ? "2.5px solid #2d6a4f"
                      : "2.5px solid transparent",
                  color: activeTab === tab.id ? "#2d6a4f" : "#6b7280",
                  fontWeight: activeTab === tab.id ? "700" : "500",
                  fontSize: "11px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {activeTab === "company" && (
              <>
                <Field
                  label="Nama Perusahaan"
                  value={data.companyName}
                  onChange={set("companyName")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Alamat Perusahaan"
                  value={data.companyAddress}
                  onChange={set("companyAddress")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Telepon/Faksimile"
                  value={data.companyPhone}
                  onChange={set("companyPhone")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Email"
                  value={data.companyEmail}
                  onChange={set("companyEmail")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Website"
                  value={data.companyWebsite}
                  onChange={set("companyWebsite")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
              </>
            )}

            {activeTab === "meta" && (
              <>
                <Field
                  label="Nomor Surat"
                  value={data.letterNumber}
                  onChange={set("letterNumber")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Lampiran"
                  value={data.attachment}
                  onChange={set("attachment")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Perihal"
                  value={data.subject}
                  onChange={set("subject")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Tanggal"
                  value={data.date}
                  onChange={set("date")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
              </>
            )}

            {activeTab === "recipient" && (
              <>
                <Field
                  label="Nama Penerima (dengan gelar)"
                  value={data.recipientTitle}
                  onChange={set("recipientTitle")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Jabatan / Perusahaan"
                  value={data.recipientRole}
                  onChange={set("recipientRole")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Alamat Penerima"
                  value={data.recipientAddress}
                  onChange={set("recipientAddress")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Salam Pembuka"
                  value={data.opening}
                  onChange={set("opening")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
              </>
            )}

            {activeTab === "body" && (
              <>
                <div>
                  <label style={labelCls}>Isi Surat</label>
                  <textarea
                    value={data.body}
                    onChange={set("body")}
                    rows={16}
                    style={{
                      ...inputCls,
                      resize: "vertical",
                      lineHeight: "1.6",
                      fontFamily: "'Times New Roman', serif",
                      fontSize: "12px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      marginTop: "4px",
                    }}
                  >
                    Gunakan baris kosong untuk memisahkan paragraf. Daftar
                    bernomor dimulai dengan "1."
                  </div>
                </div>
              </>
            )}

            {activeTab === "sign" && (
              <>
                <Field
                  label="Salam Penutup"
                  value={data.closing}
                  onChange={set("closing")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Nama Penandatangan"
                  value={data.signerName}
                  onChange={set("signerName")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
                <Field
                  label="Jabatan Penandatangan"
                  value={data.signerTitle}
                  onChange={set("signerTitle")}
                  style={inputCls}
                  labelStyle={labelCls}
                />
              </>
            )}
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#f0ede8",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Style badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                background: "#2d6a4f",
                color: "white",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              {data.letterStyle} Style
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Pratinjau langsung
            </div>
          </div>

          {/* Paper */}
          <div
            style={{
              background: "white",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
              borderRadius: "3px",
              padding: "40px 52px",
              width: "100%",
              maxWidth: "720px",
              minHeight: "900px",
            }}
          >
            <div ref={printRef}>
              <LetterPreview data={data} />
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              fontSize: "11px",
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            Klik "Unduh / Cetak" di atas untuk menyimpan atau mencetak surat
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, style, labelStyle }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={onChange} style={style} />
    </div>
  );
}
