import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const dist = resolve(__dirname, "../dist");

if (!existsSync(dist)) {
  mkdirSync(dist);
}

function createScript(fileName: string, content: string) {
  writeFileSync(resolve(dist, `./${fileName}`), content, { encoding: "utf8" });
}

function createIndexHtml() {
  const scriptList: string[] = [];
  for (let i = 1; i <= 100; i++) {
    scriptList.push(`<script src="${i}.js"></script>`);

    let jsContent = ``;

    for (let l = 0; l < Math.random() * 3000; l++) {
      jsContent += `
      function f${l}() {
        console.log("abc");
      }`;
    }

    createScript(
      `${i}.js`,
      `
    ${jsContent}
    value ++;
    console.log(value);
    `
    );
  }

  writeFileSync(
    resolve(dist, "./index.html"),
    `
    <html>
      <head>
      <script>
        var value = 0;
      </script>
      ${scriptList.join("\n")}
      </head>
    </html>
  `,
    { encoding: "utf8" }
  );
}

createIndexHtml();
