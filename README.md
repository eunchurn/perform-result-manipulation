# Perform / Midas Gen 결과 정리

## Work Flow & Roadmap

- [x] Midas gen result text files parsing to object
- [x] Perform result text files parsing to object
- [x] Manipulation data relation and print result to object
- [ ] Plotting result with every member

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
│   ├── demandShear
│   │   └── gen_summary2.json
│   └── gen_summary2.json
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
    ├── Wall_EQ7_V_2.json
    └── demandShear
        ├── Wall_EQ1_V.json
        ├── Wall_EQ1_V2.json
        ├── Wall_EQ2_V.json
        ├── Wall_EQ2_V2.json
        ├── Wall_EQ3_V.json
        ├── Wall_EQ3_V2.json
        ├── Wall_EQ4_V.json
        ├── Wall_EQ4_V2.json
        ├── Wall_EQ5_V.json
        ├── Wall_EQ5_V2.json
        ├── Wall_EQ6_V.json
        ├── Wall_EQ6_V2.json
        ├── Wall_EQ7_V.json
        └── Wall_EQ7_V2.json
```

## Notice

- Every file should match the member name as below,

- Midas Gen result

![gen-data](doc/gen-data.png)

- Perform 3D result

![perform-data](doc/perform-data.png)
