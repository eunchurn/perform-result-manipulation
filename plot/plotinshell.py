import sys, json, numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage.filters import gaussian_filter1d

# Data from JSON file
with open('./result/result.json') as json_file:
  data = json.load(json_file)

# First Member extract
firstEQMemberNames = list(data[0][next(iter(data[0]))].keys())

filter_sigma = 2

# Get every member data from all EQs
for member in firstEQMemberNames:
  for i, EQ in enumerate(data, start=0):
    memberData = EQ[next(iter(EQ))][member]
    story = memberData["story"]
    if (i==0):
      shearByEQ = np.array(memberData["shear"])
      shearByEQSmoothed = gaussian_filter1d(shearByEQ, sigma = filter_sigma)
    else:
      shearByEQ = np.vstack([shearByEQ, np.array(memberData["shear"])])
      shearByEQSmoothed = np.vstack([shearByEQSmoothed, gaussian_filter1d(np.array(memberData["shear"]), sigma = filter_sigma)])

print(shearByEQ)
print(story)

plt.plot(shearByEQ.transpose(), story)
plt.show()

plt.plot(shearByEQSmoothed.transpose(), story)
plt.show()