export default function FormSurat({ data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Form Surat</h2>

      <input name="nama" placeholder="Nama" onChange={handleChange} />
      <input name="alamat" placeholder="Alamat" onChange={handleChange} />
      <input name="tujuan" placeholder="Tujuan" onChange={handleChange} />
      <input name="tanggal" type="date" onChange={handleChange} />

      <textarea name="isi" placeholder="Isi Surat" onChange={handleChange} />
      <textarea name="penutup" placeholder="Penutup" onChange={handleChange} />
    </div>
  );
}
