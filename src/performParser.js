import fs from "fs";

export const performParser = (filename, callback) => {
  try {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) throw err;
      const lines = data.toString().split("\n");
      const columnsLines = lines.filter(line => line.startsWith("Column,"));
      const maximum = lines
        .filter(line => line.includes("Maximum"))[0]
        .replace(/\r/g, "")
        .replace("Maximum,", "")
        .split(",")
        .map(val => Number(val));
      const minimum = lines
        .filter(line => line.includes("Minimum"))[0]
        .replace(/\r/g, "")
        .replace("Minimum,", "")
        .split(",")
        .map(val => Number(val));
      const columns = columnsLines.map((line, index) => {
        const column = line.replace(/\r/g, "").trim();
        const member = {
          column: Number(column.split(",")[1].trim()),
          sectionNo: Number(column.split(",")[3].trim()),
          name: column.split(",")[5].trim(),
          maximum: maximum[index],
          minimum: minimum[index]
        };
        return member;
      });
      callback(null, { columns, maximumResult: maximum, minimumResult: minimum });
    });
  } catch (error) {
    callback(error);
  }
};
