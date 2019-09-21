import { genMemberParser } from "@src/midasgenParser";
import { performParser } from "@src/performParser";
import { extractData } from "@src/extractGenDemandShear";
import fs from "fs";

genMemberParser("./data/midasgen/gen_summary2.txt", (err, data) => {
  if (err) throw err;
  const genShearDemand = extractData(data);
  // console.log(basicInfo[0].basicData)
  // fs.writeFile("./result/midasgen/gen_summary2.json",JSON.stringify(data), (err) => err)
  // fs.writeFile("./result/midasgen/demand_shear.json",JSON.stringify(basicInfo), (err) => err)
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

performFiles.map(file => {
  performParser(file, (err, data) => {
    if (err) throw err;
    const resultFile = file.replace("data", "result").replace(".txt", ".json");
    console.log(resultFile);
    fs.writeFile(resultFile, JSON.stringify(data), err => err);
  });
});
