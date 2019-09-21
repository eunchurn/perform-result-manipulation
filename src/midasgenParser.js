import fs from "fs";

export const genMemberParser = (filename, callback) => {
  try {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) throw err;
      const lines = data.toString().split("\n");
      const membersLine = lines;
      const memberStartLine = [];
      membersLine.filter((line, index) => {
        if (line.startsWith(" *")) {
          memberStartLine.push(index);
          return true;
        }
      });
      const nMembers = memberStartLine.length / 2;
      let JSONData = {};
      for (let i = 0; i < nMembers; i += 2) {
        const memberName = lines[memberStartLine[i]]
          .split("=")[1]
          .split(" ")[1];
        const curMember = lines
          .slice(memberStartLine[i] + 5, memberStartLine[i + 2])
          .filter(
            line =>
              !line.startsWith("\f") &&
              !line.startsWith("\r") &&
              !line.startsWith("--") &&
              !line.startsWith("==") &&
              !line.startsWith(" midas")
          );
        const storyData = [];
        curMember.map(line => {
          const targetLine = line
            .trim()
            .replace(/\(/g, " ")
            .replace(/\)/g, " ")
            .replace(/\,/g, " ");
          const story = targetLine.split(" ").filter(val => val.length !== 0);
          const storyJSON = {
            STO: story[0],
            HTw: Number(story[1]),
            hw: Number(story[2]),
            fck: Number(story[3]),
            fy: Number(story[4]),
            fys: Number(story[5]),
            Pu: Number(story[6]),
            Mc: {
              kN_m: Number(story[7]),
              LCB: Number(story[8]),
              iWAL: Number(story[9]),
              Lw: Number(story[10])
            },
            Vu: {
              kN: Number(story[11]),
              LCB: Number(story[12]),
              iWAL: Number(story[13]),
              Lw: Number(story[14])
            },
            AsV: Number(story[15].split(/\./g)[0]),
            VRebar: story[15].split(/\./g)[1],
            AsH: Number(story[16].split(/\./g)[0]),
            HRebar: story[16].split(/\./g)[1]
          };
          storyData.push(storyJSON);
        });
        JSONData[memberName] = storyData;
      }
      callback(null, JSONData);
    });
  } catch (error) {
    callback(error);
  }
};
