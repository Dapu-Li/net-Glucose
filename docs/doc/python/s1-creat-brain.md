---
outline: deep
---

# s1_creat_brain.py

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz site.
:::

```python
import nibabel as nib
import numpy as np
import pandas as pd
import os

# 定义数据路径
dpath = 'C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/'

# 加载脑区模板文件
cor_file = dpath + 'cor/HarvardOxford-cort-maxprob-thr50-1mm.nii'
cer_file = dpath + 'cer/Cerebellum-MNIflirt-maxprob-thr50-1mm.nii'
sub_file = dpath + 'sub/HarvardOxford-sub-maxprob-thr50-1mm.nii'

cor_nii = nib.load(cor_file)
cer_nii = nib.load(cer_file)
sub_nii = nib.load(sub_file)

# 加载表达式数据
df = pd.read_csv(dpath + 'brain_structure_regression2_expression.csv')
predictors = df['predictor'].unique()
br = ['cor', 'cer', 'sub']

# 确保输出目录存在
output_dir = dpath + 'brain/'
os.makedirs(output_dir, exist_ok=True)

# 遍历每个 predictor
for predictor in predictors:
    print(f"Processing predictor: {predictor}")
    df1 = df[df['predictor'] == predictor]

    for brain_type in br:
        print(f"  Processing brain type: {brain_type}")
        df1_brain = df1[df1['brain'] == brain_type]
        if df1_brain.empty:
            print(f"    No data found for {predictor} and {brain_type}. Skipping...")
            continue

        multipliers = df1_brain['expression'].values[0].split(",")
        multipliers = [float(x) for x in multipliers]

        if brain_type == 'cor':
            data = cor_nii.get_fdata()
            mask_dir = dpath + 'cor/'
            num_masks = 48
        elif brain_type == 'cer':
            data = cer_nii.get_fdata()
            mask_dir = dpath + 'cer/'
            num_masks = 28
        elif brain_type == 'sub':
            data = sub_nii.get_fdata()
            mask_dir = dpath + 'sub/'
            num_masks = 21
        else:
            raise ValueError(f"Unknown brain type: {brain_type}")

        if len(multipliers) != num_masks:
            raise ValueError(
                f"Length of multipliers ({len(multipliers)}) does not match the number of masks ({num_masks}) for {predictor} and {brain_type}")

        final_result = np.zeros_like(data)

        for i in range(1, num_masks + 1):
            mask_filename = mask_dir + f'brain_mask_{i}.nii'
            mask_nii = nib.load(mask_filename)
            mask_data = mask_nii.get_fdata()
            mask_data = mask_data * multipliers[i - 1]
            final_result += mask_data

        # 保存结果
        output_filename = output_dir + f'{predictor}_{brain_type}.nii'
        if brain_type == 'cor':
            new_nii = nib.Nifti1Image(final_result, cor_nii.affine)
        elif brain_type == 'cer':
            new_nii = nib.Nifti1Image(final_result, cer_nii.affine)
        elif brain_type == 'sub':
            new_nii = nib.Nifti1Image(final_result, sub_nii.affine)

        nib.save(new_nii, output_filename)
        print(f"    Saved {output_filename}")
```


