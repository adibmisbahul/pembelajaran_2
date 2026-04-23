export default function StyleSelector({ setStyle }) {
  return (
    <select onChange={(e) => setStyle(e.target.value)}>
      <option value="full-block">Full Block</option>
      <option value="semi-block">Semi Block</option>
      <option value="indented">Indented</option>
      <option value="hanging">Hanging Paragraph</option>
      <option value="official">Official</option>
    </select>
  );
}