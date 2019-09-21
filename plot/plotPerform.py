import numpy as np
import matplotlib.pyplot as plt
import json

with open('./result/perform/demandShear/Wall_EQ1_V.json') as json_file:
  data = json.load(json_file)
  for key in data.keys():
    print(data[key]['shear'])