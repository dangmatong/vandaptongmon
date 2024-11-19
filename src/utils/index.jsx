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
