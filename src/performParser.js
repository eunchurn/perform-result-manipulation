import fs from "fs";

export const performParser = (filename, callback) => {
  try {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) throw err;
      const lines = data.toString().split("\n");
      const columnsLines = lines.filter(line => line.startsWith("Column,"));
      const columns = columnsLines.map(line => {
        const column = line.replace(/\r/g, "").trim();
        const member = {
          column: Number(column.split(",")[1].trim()),
          sectionNo: Number(column.split(",")[3].trim()),
          name: column.split(",")[5].trim()
        };
        return member;
      });
      const maximum = lines
        .filter(line => line.includes("Maximum"))[0]
        .replace(/\r/g, "")
        .replace("Maximum, ", "")
        .split(",")
        .map(val => Number(val));
      const minimum = lines
        .filter(line => line.includes("Minimum"))[0]
        .replace(/\r/g, "")
        .replace("Minimum, ", "")
        .split(",")
        .map(val => Number(val));
      callback(null, { columns, maximum, minimum });
    });
  } catch (error) {
    callback(error);
  }
};
