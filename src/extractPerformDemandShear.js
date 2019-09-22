export const extractPerformDS = data => {
  return new Promise((resolve, reject) => {
    try {
      const shearData = {};
      data.columns.map(column => {
        const nameArr = column.name.split(/\-/g);
        const member = nameArr.splice(0, nameArr.length - 1).join("-");
        const story = nameArr[0];
        const { maximum, minimum } = column;
        const shear = Math.max(Math.abs(maximum), Math.abs(minimum));
        shearData[member] = {
          story:
            member in shearData ? [...shearData[member].story, story] : [story],
          maximum:
            member in shearData
              ? [...shearData[member].maximum, maximum]
              : [maximum],
          minimum:
            member in shearData
              ? [...shearData[member].minimum, minimum]
              : [minimum],
          shear:
            member in shearData ? [...shearData[member].shear, shear] : [shear]
        };
      });
      const keys = Object.keys(shearData);
      keys.map(key => {
        shearData[key].maxShear = Math.max(...shearData[key].shear);
      });
      resolve(shearData);
    } catch (error) {
      reject(error);
    }
  });
};
