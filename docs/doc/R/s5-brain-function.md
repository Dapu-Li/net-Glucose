---
outline: deep
---

# s5_brain_function.R

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz cite.
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

load('data//brain_function/brain_function.RData')
y <- colnames(brain_function)[-1]
y_cata <- c('General_mental_status', 'Mental_distress')
y <- y[!y %in% y_cata]


load('data/cov/cov_clean.RData')
df <- merge(pro, brain_function, by = 'id')
df <- merge(df, cov, by = 'id')
colnames(df) <- gsub('\\-', '_', colnames(df))
rm(pro, cov, brain_function)


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
#res_cata1 <- Logres(paste0(vars_to_cut, '_iqr'), y_cata, co, df)
res_cata2 <- Logres(vars_to_cut, y_cata, co, df)

colnames(res_cata2) <- colnames(res1)
res0$diration <- ifelse(res0$Beta > 0, '1', '0')
res1$diration <- ifelse(res1$Beta > 0, '1', '0')
res_cata2$diration <- ifelse(res_cata2$Beta > 1, '1', '0')
res00 <- rbind(res0, res_cata2)
res11 <- rbind(res1, res_cata2)
res00$p_FDR <- p.adjust(res00$P.value, method = 'fdr')
res00$p_Bonferroni <- p.adjust(res00$P.value, method = 'bonferroni')
res11$p_FDR <- p.adjust(res11$P.value, method = 'fdr')
res11$p_Bonferroni <- p.adjust(res11$P.value, method = 'bonferroni')

res_all <- cbind(res00, res11)

write.csv(res_all, 'Results/brain_function/brain_function_regression_total1.csv', row.names = F)

```