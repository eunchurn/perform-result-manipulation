import { genMemberParser } from "@src/midasgenParser";
import { performParser } from "@src/performParser";
import { extractGenDS } from "@src/extractGenDemandShear";
import { extractPerformDS } from "@src/extractPerformDemandShear";
import fs from "fs";

genMemberParser("./data/midasgen/gen_summary2.txt", (err, data) => {
  if (err) throw err;
  const genShearDemand = extractGenDS(data);
  fs.writeFile("./result/midasgen/gen_summary2.json",JSON.stringify(data), (err) => err)
  fs.writeFile("./result/midasgen/demandShear/gen_summary2.json",JSON.stringify(genShearDemand), (err) => err)
});

const performFiles = [
  "./data/perform/Wall_EQ1_V.txt",
  "./data/perform/Wall_EQ2_V.txt",
  "./data/perform/Wall_EQ3_V.txt",
  "./data/perform/Wall_EQ4_V.txt",
  "./data/perform/Wall_EQ5_V.txt",
  "./data/perform/Wall_EQ6_V.txt",
  "./data/perform/Wall_EQ7_V.txt",
  "./data/perform/Wall_EQ1_V_2.txt",
  "./data/perform/Wall_EQ2_V_2.txt",
  "./data/perform/Wall_EQ3_V_2.txt",
  "./data/perform/Wall_EQ4_V_2.txt",
  "./data/perform/Wall_EQ5_V_2.txt",
  "./data/perform/Wall_EQ6_V_2.txt",
  "./data/perform/Wall_EQ7_V_2.txt"
];

const resultPerformDS = [
  "./result/perform/demandShear/Wall_EQ1_V.json",
  "./result/perform/demandShear/Wall_EQ2_V.json",
  "./result/perform/demandShear/Wall_EQ3_V.json",
  "./result/perform/demandShear/Wall_EQ4_V.json",
  "./result/perform/demandShear/Wall_EQ5_V.json",
  "./result/perform/demandShear/Wall_EQ6_V.json",
  "./result/perform/demandShear/Wall_EQ7_V.json",
  "./result/perform/demandShear/Wall_EQ1_V2.json",
  "./result/perform/demandShear/Wall_EQ2_V2.json",
  "./result/perform/demandShear/Wall_EQ3_V2.json",
  "./result/perform/demandShear/Wall_EQ4_V2.json",
  "./result/perform/demandShear/Wall_EQ5_V2.json",
  "./result/perform/demandShear/Wall_EQ6_V2.json",
  "./result/perform/demandShear/Wall_EQ7_V2.json"
];

performFiles.map((file, index) => {
  performParser(file, (err, data) => {
    if (err) throw err;
    const resultFile = file.replace("data", "result").replace(".txt", ".json");
    fs.writeFile(resultFile, JSON.stringify(data), err => err);
    extractPerformDS(data, (err, performShearDemand) => {
      if (err) throw err;
      console.log(resultPerformDS[index])
      fs.writeFile(
        resultPerformDS[index],
        JSON.stringify(performShearDemand),
        err => err
      );
    });
  });
});
