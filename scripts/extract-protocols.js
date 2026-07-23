/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function main() {
  try {
    console.log("Reading PDF...");

    const parser = new PDFParse({
      data: fs.readFileSync(
        "./public/protocols/covenant-health-air-protocols.pdf"
      ),
    });

    const result = await parser.getText();

    fs.writeFileSync(
      "./protocol-text.txt",
      result.text,
      "utf8"
    );

    console.log("✅ PDF parsed successfully");
    console.log(`Pages: ${result.total}`);
    console.log("✅ protocol-text.txt created");
  } catch (err) {
    console.error(err);
  }
}

main();
