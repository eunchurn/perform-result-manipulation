import { PythonShell } from "python-shell";
import { genMemberParser } from "@src/midasgenParser";
import { performParser, performParserSync } from "./src/performParser";
import { extractGenDS } from "@src/extractGenDemandShear";
import { extractPerformDS } from "@src/extractPerformDemandShear";
import fs from "fs";

console.log(process.argv);
const files = require(`./${process.argv[2]}`);

const { inputXPerform, inputYPerform, inputGen } = files;

const dataX = inputXPerform.map(async (file, index) => {
  const EQ = Object.keys(file)[0];
  const parsedData = await performParser(file[EQ]);
  return { [EQ]: await extractPerformDS(parsedData) };
});

Promise.all(dataX)
  .then(data => {
    // fs.writeFile("./result/result.json", JSON.stringify(data), err => err);
    const pyshell = new PythonShell("./plot/plot.py");
    pyshell.send(JSON.stringify(data)).end(err => {
      if (err) throw err;
    });
    pyshell.stdout.on("data", out => console.log(out));
    pyshell.stderr.on("data", console.log);
  })
  .catch(err => console.log(err));
