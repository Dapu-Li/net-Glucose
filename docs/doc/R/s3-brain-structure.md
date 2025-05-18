---
outline: deep
---

# s3_brain_structure.R

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
rm(pro_lm1, pro_lm1_bfi_list)

load('data/brain_structure/brain_structure.RData')
bs <- na.omit(brain_structure)
#bs[-1] <- scale(bs[-1])
y <- colnames(bs)[-1]
rm(brain_structure)

load('data/cov/cov_clean.RData')
df <- merge(pro, bs, by = 'id')
df <- merge(df, cov, by = 'id')
colnames(df) <- gsub('\\-', '_', colnames(df))
rm(pro, bs, cov)


vars_to_cut <- c('Gln', 'Glu', 'GlycA', 'Lactate', 'M_VLDL_C', 'M_VLDL_CE', 'S_HDL_L', 'S_HDL_PL', 'Unsaturation')
df[paste0(vars_to_cut, '_iqr')] <- lapply(df[vars_to_cut], function(var) {
  cut(var, breaks = quantile(var, probs = c(0, 1/4, 2/4, 3/4, 1), na.rm = TRUE), include.lowest = TRUE, labels = c('1', '2', '3', '4'))
})
df[paste0(vars_to_cut, '_iqr')] <- lapply(df[paste0(vars_to_cut, '_iqr')], as.numeric)
co <- c('age','sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns')
#function(Var.analys, Y, co, data)
source('R/function.R')
res0 <- res(paste0(vars_to_cut, '_iqr'), y, co, df)
res1 <- res(vars_to_cut, y, co, df)
#res_all <- cbind(res, res1)

# FDR correction
colnames(res0)
res0$p_FDR <- p.adjust(res0$P.value, method = 'fdr')
res0$p_Bonferroni <- p.adjust(res0$P.value, method = 'bonferroni')
res1$p_FDR <- p.adjust(res1$P.value, method = 'fdr')
res1$p_Bonferroni <- p.adjust(res1$P.value, method = 'bonferroni')
res_all <- cbind(res0, res1)
colnames(res_all)[8] <- 'Characteristics1'


cols <- read.csv('data/brain_structure/columns.csv')
cols <- cols[-1,]
cols$field <- paste0('X', cols$X0.1)
cols$X0.1 <- NULL
#colnames(res_all)
res_all1 <- merge(cols, res_all, by.x = 'field', by.y = 'Characteristics')

write.csv(res_all1, 'Results/brain_structure/brain_structure_regression2.csv', row.names = FALSE)

```