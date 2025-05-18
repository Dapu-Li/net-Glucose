---
outline: deep
---

# s2_brain_cox.R

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz site.
:::

```R
rm(list = ls())
setwd("C:/Users/Administrator/Desktop/diabete_metabolism_brain")
load('data/metabolism_no_proportion.RData')

pro_lm1 <- read.csv('Results/lm/pro_lm1.csv')
pro_lm1 <- pro_lm1[pro_lm1$p_val_bfi < 0.05,]
pro_lm1_bfi_list <- pro_lm1$Pro

pro <- pro[, c('id', pro_lm1_bfi_list)]

ad <- read.csv('data/ad_pd_stroke_ba/ad_target.csv')
pd <- read.csv('data/ad_pd_stroke_ba/pd_target.csv')
stroke <- read.csv('data/ad_pd_stroke_ba/stroke_target.csv')
load("data/brain_disease/dep_anx.RData")

y <- merge(ad, pd, by = 'id', suffixes = c('', '_1'))
y <- merge(y, stroke, by = 'id', suffixes = c('', '_2'))
y <- merge(y, dep_anx, by = 'id', suffixes = c('', '_3'))
y <- y[,!grepl('1$', colnames(y))]
y <- y[,!grepl('2$', colnames(y))]
y <- y[,!grepl('3$', colnames(y))]
rm(ad, pd, stroke, dep_anx)

load('data/cov/cov_clean.RData')
df <- merge(y, pro, by = 'id')
df <- merge(df, cov, by = 'id')
#把列名中的‘.’替换成‘_’
colnames(df) <- gsub('\\-', '_', colnames(df))
rm(y, pro, cov, pro_lm1, pro_lm1_bfi_list)

source('R/function.R')
library(survival)
colnames(df)

x <- c('Gln', 'Glu', 'GlycA', 'Lactate', 'M_VLDL_C', 'M_VLDL_CE', 'S_HDL_L', 'S_HDL_PL', 'Unsaturation')

# ACD
co <- c('age','sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns', 'apoe_carrier', 'prs_ad')
data <- df[df$dementia_durations > 0,]
res_acd <- res_cox('dementia_durations', 'dementia', x, co, data)
data <- df[df$dementia_vascular_durations > 0,]
res_vd <- res_cox('dementia_vascular_durations', 'dementia_vascular', x, co, data)
data <- df[df$dementia_alzheimer_durations > 0,]
res_ad <- res_cox('dementia_alzheimer_durations', 'dementia_alzheimer', x, co, data)

# PD
co <- c('age','sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns', 'prs_pd')
data <- df[df$durations > 0,]
res_pd <- res_cox('durations', 'target', x, co, data)

# Stroke
co <- c('age','sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns', 'prs_stroke')
data <- df[df$stroke_durations > 0,]
res_stroke <- res_cox('stroke_durations', 'stroke', x, co, data)

# Depression
co <- c('age','sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns')
data <- df[df$depression_durations > 0,]
res_dep <- res_cox('depression_durations', 'depression', x, co, data)

# Anxiety
co <- c('age', 'sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns')
data <- df[df$anxiety_durations > 0,]
res_anx <- res_cox('anxiety_durations', 'anxiety', x, co, data)

res_total <- rbind(res_acd, res_vd, res_ad, res_pd, res_stroke, res_dep, res_anx)
res_total$p_FDR <- p.adjust(res_total$P.value, method = 'fdr')
res_total$p_Bonferroni <- p.adjust(res_total$P.value, method = 'bonferroni')

res_total$Characteristics <- gsub('_', '-', res_total$Characteristics)

colnames(res_total)
colnames(pro_code)
res_total <- merge(res_total, pro_code, by.x = 'Characteristics', by.y = 'Abbreviations', all.x = T)

write.csv(res_total, 'Results/cox/brain_disease_cox_fdr.csv', row.names = F)
```