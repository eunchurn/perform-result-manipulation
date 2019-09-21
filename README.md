# Perform / Midas Gen 결과 정리

## Work Flow & Roadmap

- [x] Midas gen result text files parsing to object
- [x] Perform result text files parsing to object
- [ ] Manipulate data relation and write result to object
- [ ] Plotting result with every members

## Example data structure

```bash
data
├── midasgen
│   └── gen_summery2.txt
└── perform
    ├── Wall_EQ1_V.txt
    ├── Wall_EQ1_V_2.txt
    ├── Wall_EQ2_V.txt
    ├── Wall_EQ2_V_2.txt
    ├── Wall_EQ3_V.txt
    ├── Wall_EQ3_V_2.txt
    ├── Wall_EQ4_V.txt
    ├── Wall_EQ4_V_2.txt
    ├── Wall_EQ5_V.txt
    ├── Wall_EQ5_V_2.txt
    ├── Wall_EQ6_V.txt
    ├── Wall_EQ6_V_2.txt
    ├── Wall_EQ7_V.txt
    └── Wall_EQ7_V_2.txt
```

## Result data structure

```bash
result
├── midasgen
│   ├── demand_shear.json
│   └── gen_summary2.json
└── perform
    ├── Wall_EQ1_V.json
    ├── Wall_EQ1_V_2.json
    ├── Wall_EQ2_V.json
    ├── Wall_EQ2_V_2.json
    ├── Wall_EQ3_V.json
    ├── Wall_EQ3_V_2.json
    ├── Wall_EQ4_V.json
    ├── Wall_EQ4_V_2.json
    ├── Wall_EQ5_V.json
    ├── Wall_EQ5_V_2.json
    ├── Wall_EQ6_V.json
    ├── Wall_EQ6_V_2.json
    ├── Wall_EQ7_V.json
    └── Wall_EQ7_V_2.json
```
