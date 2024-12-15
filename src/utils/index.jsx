export const removeDiacritics = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const addSpaceBeforeQuestionMark = (input) => {
  return input.replace(/(\S\?)/g, (match, group) => {
    return group[0] + " ?";
  });
};

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

const findAllOccurrences = (line, term) => {
  const newTerm = addSpaceBeforeQuestionMark(term ? term.trim() : "");
  const cleanLine = removeDiacritics(line).toLowerCase();
  const cleanTerm = removeDiacritics(newTerm).toLowerCase();
  let positions = [];
  let startIndex = 0;

  while (startIndex < cleanLine.length) {
    const index = cleanLine.indexOf(cleanTerm, startIndex);
    if (index === -1) break;
    positions.push(index);
    startIndex = index + cleanTerm.length; // Di chuyển qua từ khóa vừa tìm thấy
  }
  return positions;
};

export const highlightMatchesWithPositions = (line, term) => {
  const newTerm = addSpaceBeforeQuestionMark(term ? term.trim() : "");
  if (!newTerm) return line; // Nếu không có từ khóa, trả về chuỗi gốc

  const positions = findAllOccurrences(line, newTerm);
  if (positions.length === 0) return line; // Nếu không tìm thấy, trả về chuỗi gốc

  const elements = [];
  let currentIndex = 0;

  positions.forEach((pos, index) => {
    // Thêm phần trước đoạn khớp
    elements.push(line.slice(currentIndex, pos));
    // Thêm đoạn khớp được highlight
    elements.push(
      <span key={index} className="bg-yellow-200 font-bold">
        {line.slice(pos, pos + newTerm.length)}
      </span>
    );
    // Cập nhật chỉ mục hiện tại
    currentIndex = pos + newTerm.length;
  });

  // Thêm phần còn lại của chuỗi
  elements.push(line.slice(currentIndex));
  return elements;
};
