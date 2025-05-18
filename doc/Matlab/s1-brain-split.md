---
outline: deep
---

# s1_brian_split.m

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz site.
:::

```matlab
file = 'C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/cer/Cerebellum-MNIflirt-maxprob-thr50-1mm.nii';
nii = spm_vol(file)

data  = spm_read_vols(nii)

id = [1:28]

for i = 1:length(id)
    mask = zeros(size(data));
    mask(data == id(i)) = 1;
    maskNii = nii;
    maskNii.fname = ['brain_mask_' num2str(id(i)) '.nii'];
    spm_write_vol(maskNii, mask);
end

file = 'C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/cor/HarvardOxford-cort-maxprob-thr50-1mm.nii';
nii = spm_vol(file)

data  = spm_read_vols(nii)

id = [1:48]

for i = 1:length(id)
    mask = zeros(size(data));
    mask(data == id(i)) = 1;
    maskNii = nii;
    maskNii.fname = ['brain_mask_' num2str(id(i)) '.nii'];
    spm_write_vol(maskNii, mask);
end

file = 'C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/sub/HarvardOxford-sub-maxprob-thr50-1mm.nii';

nii = spm_vol(file)

data  = spm_read_vols(nii)

id = [1:21]

for i = 1:length(id)
    mask = zeros(size(data));
    mask(data == id(i)) = 1;
    maskNii = nii;
    maskNii.fname = ['brain_mask_' num2str(id(i)) '.nii'];
    spm_write_vol(maskNii, mask);
end

```


