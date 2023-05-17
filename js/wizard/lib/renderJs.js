function createJsonMap(data) {
  return JSON.stringify(
    data,
    (key, value) => value,
    2
  );
}

function renderJs(data) {
  let output = '';
  if (data.settings) {
    for (const [key, value] of Object.entries(data.settings)) {
      const name = key.toUpperCase().replace(/-/g, '_');
      const json = createJsonMap(value);
      output += `export const ${name} = ${json};\n\n`;
    }
  }
  return output;
}

module.exports = renderJs;
