import { genMemberParser } from "@src/midasgen.js";
import fs from "fs";

genMemberParser("./data/midasgen/gen_summary2.txt", (err, data) => {
  if (err) throw err;
  fs.writeFile("./result/midasgen/gen_summary2.json",JSON.stringify(data), (err) => err)
});