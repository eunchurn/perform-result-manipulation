clear all; clc; close all;

pathName = "../result/perform/demandShear";

D = dir(fullfile(pathName, '*V.json'));
files = {D.name};

srInc = 10;
filename = fullfile(pathName, files{1});
val = jsondecode(fileread(filename));
memberName = fieldnames(val);

for kk = 1:2%length(memberName)
  member = memberName{kk};
  shear = [];
  smoothedShear = [];

  for ii = 1:length(files)
    filename = fullfile(pathName, files{ii});
    val = jsondecode(fileread(filename));
    memberData = val.(member);
    shear(:, ii) = memberData.shear;
    legendName{ii} = ['EQ', num2str(ii)];
  end

  story = 1:length(shear);
  newPoints = linspace(1, length(shear), length(shear) * srInc);

  for ii = 1:length(files)
    smoothedShear(:, ii) = spline(story, shear(:, ii), newPoints);
  end

  avgShear = mean(shear');
  smoothedAvgShear = spline(story, avgShear, newPoints);
  legendName{length(files) + 1} = 'Average';
  legendName{length(files) + 2} = '1.2Average';
  figure, plot(smoothedShear, newPoints, ':', smoothedAvgShear, newPoints, '-', smoothedAvgShear * 1.2, newPoints, '-', 'LineWidth', 2)
  xlabel('Shear Force (kN)');
  ylabel('Story (no information now)');
  ylim([story(1) story(end)])
  title([member, '-Wall Shear Result'])
  legend(legendName)
  grid on
end
