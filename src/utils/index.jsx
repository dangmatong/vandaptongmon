import confetti from "canvas-confetti";
import dayjs from "dayjs";

export const calcTimeDuration = (targetTime) => {
  const targetDate = new Date(targetTime).getTime();
  const currentTime = new Date().getTime();

  return targetDate - currentTime;
};

export const compareTime = (t) => {
  const currentTime = dayjs();
  const endTime = dayjs(t);
  if (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    return true;
  }
  return false;
};

export const removeDiacritics = (str) =>
  str
    .replace(/[\u200B-\u200D\uFEFF\u2060]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const normalizeSearchText = (str) =>
  removeDiacritics(str)
    .replace(/([?!.,:;])/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

export const addSpaceBeforeQuestionMark = (input) =>
  input.replace(/(?<![\s?])\?/g, " ?");

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
    ),
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

const isWordBoundary = (str, pos) => {
  return pos < 0 || pos >= str.length || /\W/.test(str[pos]);
};

const getSearchWords = (term) => {
  if (!term?.trim()) return [];

  return [
    ...new Set(
      removeDiacritics(term)
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 0),
    ),
  ];
};

const countWholeWordMatches = (normalizedLine, word) => {
  let start = 0;
  let count = 0;

  while (true) {
    const index = normalizedLine.indexOf(word, start);

    if (index === -1) return count;

    if (
      isWordBoundary(normalizedLine, index - 1) &&
      isWordBoundary(normalizedLine, index + word.length)
    ) {
      count++;
      start = index + word.length;
    } else {
      start = index + 1;
    }
  }
};

export const calculateSearchScore = (line, term) => {
  const words = getSearchWords(term);
  if (!words.length) return 0;

  const normalizedLine = removeDiacritics(line).toLowerCase();

  return words.reduce(
    (count, word) => count + countWholeWordMatches(normalizedLine, word),
    0,
  );
};

export const highlightMatchesWithPositions = (line, term) => {
  term = addSpaceBeforeQuestionMark(term ? term.trim() : "");

  const words = getSearchWords(term);
  if (!words.length) return line;

  const normalizedLine = removeDiacritics(line).toLowerCase();

  const matches = [];

  words.forEach((word) => {
    let start = 0;

    while (true) {
      const index = normalizedLine.indexOf(word, start);

      if (index === -1) break;

      if (
        !isWordBoundary(normalizedLine, index - 1) ||
        !isWordBoundary(normalizedLine, index + word.length)
      ) {
        start = index + 1;
        continue;
      }

      let matchStart = index;
      let matchEnd = index + word.length;

      // ăn luôn space phía trước
      if (matchStart > 0 && line[matchStart - 1] === " ") {
        matchStart--;
      }

      // ăn luôn space phía sau
      if (matchEnd < line.length && line[matchEnd] === " ") {
        matchEnd++;
      }

      matches.push({
        start: matchStart,
        end: matchEnd,
      });

      start = index + word.length;
    }
  });

  if (!matches.length) return line;

  // sort theo vị trí
  matches.sort((a, b) => a.start - b.start);

  // merge các đoạn overlap
  const merged = [];

  matches.forEach((match) => {
    const last = merged[merged.length - 1];

    if (!last || match.start > last.end) {
      merged.push(match);
    } else {
      last.end = Math.max(last.end, match.end);
    }
  });

  const elements = [];
  let currentIndex = 0;

  merged.forEach((match, index) => {
    elements.push(line.slice(currentIndex, match.start));

    elements.push(
      <span key={index} className="bg-yellow-200 font-bold">
        {line.slice(match.start, match.end)}
      </span>,
    );

    currentIndex = match.end;
  });

  elements.push(line.slice(currentIndex));

  return elements;
};

export const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const confettiFireworks = (second = 5) => {
  var duration = second * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 100000,
  };

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 40 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

export const confettiRealisticLook = () => {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const confettiStars = () => {
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

export const confettiEmoji = () => {
  var scalar = 2;
  var unicorn = confetti.shapeFromText({ text: "️🎊️", scalar });
  var unicorn1 = confetti.shapeFromText({ text: "️🎉", scalar });

  var defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [unicorn, unicorn1],
    scalar,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

export const confettiSchoolPride = (second = 1) => {
  var end = Date.now() + second * 1000;

  // go Buckeyes!
  var colors = ["#f23f3f", "#ecf23f", "#4287f5", "#1bc900"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 155,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 155,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      setTimeout(() => {
        requestAnimationFrame(frame);
      }, 10);
    }
  })();
};

export const confettiSnow = () => {
  localStorage.setItem("canvas-global", true);
  var scalar = 2;
  var flowers = ["🌸", "🍃", "🍂", "💮"];
  var shapes = flowers.map((el) =>
    confetti.shapeFromText({ text: el, scalar }),
  );
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: shapes,
      gravity: randomInRange(0.4, 0.6),
      scalar: scalar,
      drift: randomInRange(-0.4, 0.4),
    });

    setTimeout(() => {
      if (localStorage.getItem("canvas-global") == "true") {
        requestAnimationFrame(frame);
      }
      if (timeLeft <= 0) {
        animationEnd = Date.now() + duration;
        skew = 1;
      }
    }, 1000);
  })();
};
