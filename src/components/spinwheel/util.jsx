export async function loadFonts(fontNames = []) {
  // Fail silently if browser doesn't support font loading.
  if (!("fonts" in document)) return;

  const promises = [];

  for (const i of fontNames) {
    if (typeof i === "string") promises.push(document.fonts.load("1em " + i));
  }

  await Promise.all(promises);
}
