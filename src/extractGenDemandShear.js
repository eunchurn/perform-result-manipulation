export const extractGenDS = data => {
  const members = Object.keys(data);
  const reBarProp = {
    10: 71.3,
    13: 126.7,
    16: 198.6,
    19: 286.5,
    22: 387.1,
    25: 506.7,
    29: 642.4,
    32: 794.2,
    35: 956.6,
    38: 1140,
    41: 1340,
    51: 2027
  };
  const ret = [];
  members.map(key => {
    const memberData = data[key];
    const basicData = {
      부재: [],
      "사용철근(수평)": [],
      간격입력: [],
      "높이입력(m)": [],
      벽폭: [],
      "V-항복강도": [],
      "H-항복강도": [],
      강도A: [],
      "벽길이(m)": [],
      강도B: [],
      "벽길이(mm)": [],
      "높이입력(mm)": []
    };
    const demandShear = {
      "수평철근 단면적": [],
      "수평철근 간격": [],
      "철근 항복기대강도": [],
      "벽체 높이": [],
      "벽체 연직단면적": [],
      "철근 전체단면적": [],
      전단철근비: [],
      Vs: [],
      "재료 강도": [],
      "벽체 폭": [],
      "벽체 길이": [],
      Vc: [],
      "벽체 전단강도": [],
      "max Vn": []
    };
    memberData.map(story => {
      // 기본정보
      basicData["부재"].push(`${key}-${story.STO}`);
      const reBar = Number(story.HRebar.split("@")[0].replace(/D/g, ""));
      basicData["사용철근(수평)"].push(reBar);
      const reBarGap = Number(story.HRebar.split("@")[1]);
      basicData["간격입력"].push(reBarGap);
      basicData["높이입력(m)"].push(story.HTw / 1000);
      basicData["벽폭"].push(story.hw);
      basicData["V-항복강도"].push(story.fy);
      basicData["H-항복강도"].push(story.fys);
      basicData["강도A"].push(story.fck);
      basicData["벽길이(m)"].push(story.Mc.Lw / 1000);
      const fckB = story.fck < 24 ? story.fck * 1.2 : story.fck * 1.1;
      basicData["강도B"].push(fckB);
      basicData["벽길이(mm)"].push(story.Mc.Lw);
      basicData["높이입력(mm)"].push(story.HTw);
      // Demand Shear
      const reBarSection = reBarProp[reBar];
      demandShear["수평철근 단면적"].push(reBarSection);
      demandShear["수평철근 간격"].push(reBarGap);
      demandShear["철근 항복기대강도"].push(story.fy * 1.05);
      demandShear["벽체 높이"].push(story.HTw);
      const vSection = story.HTw * story.hw
      demandShear["벽체 연직단면적"].push(vSection);
      const reBarWholeSection = reBarProp[reBar] * (parseInt(story.HTw / reBarGap) + 1) * 2;
      demandShear["철근 전체단면적"].push(reBarWholeSection);
      demandShear["전단철근비"].push(reBarWholeSection/vSection);
      const Vs = reBarSection * 2 * (story.fy * 1.05) * story.Mc.Lw / reBarGap / 1000;
      demandShear["Vs"].push(Vs);
      demandShear["재료 강도"].push(fckB);
      demandShear["벽체 폭"].push(story.hw);
      demandShear["벽체 길이"].push(story.Mc.Lw);
      const Vc = (fckB**0.5)*story.hw*story.Mc.Lw/1000/6;
      demandShear["Vc"].push(Vc);
      demandShear["벽체 전단강도"].push(Vs + Vc);
      const maxVn = 5*(fckB**0.5)*story.Mc.Lw*0.8*story.hw/6/1000;
      demandShear["max Vn"].push(maxVn)
    });
    ret.push({member: key, basicData, demandShear});
  });
  return ret;
};
