export const removeDiacritics = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const highlightText = (line, term) => {
  if (!term) return line; // Nếu không có từ khóa, trả về dòng gốc
  const parts = line.split(new RegExp(`(${term})`, "gi")); // Tách dòng theo từ khóa
  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <span key={index} className="bg-yellow-200 font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const highlightMatch = (line, term) => {
  const cleanLine = removeDiacritics(line).toLowerCase();
  const cleanTerm = removeDiacritics(term).toLowerCase();

  const matchIndex = cleanLine.indexOf(cleanTerm);
  if (matchIndex === -1) return line;

  const beforeMatch = line.substring(0, matchIndex);
  const match = line.substring(matchIndex, matchIndex + term.length);
  const afterMatch = line.substring(matchIndex + term.length);
  return (
    <>
      {beforeMatch}
      <span className="bg-yellow-200 font-bold">{match}</span>
      {afterMatch}
    </>
  );
};
