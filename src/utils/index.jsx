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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export const addSpaceBeforeQuestionMark = (input) => {
  return input.replace(/(\S\?)/g, (match, group) => {
    if (group[0] == "?" && group[1] == "?") {
      return group;
    }
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
    confetti.shapeFromText({ text: el, scalar })
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
