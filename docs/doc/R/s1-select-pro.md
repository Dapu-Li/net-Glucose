---
outline: deep
---

# s1_select_pro.R

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz site.
:::

```R
rm(list = ls())
setwd("C:/Users/Administrator/Desktop/diabete_metabolism_brain")
load('data/metabolism_no_proportion.RData')#

brain_age <- read.csv('data/ad_pd_stroke_ba/Brain_age.csv') # 发现队列
#brain_age <- read.csv('data/ad_pd_stroke_ba/Brain_ins3.csv') # 验证队列

colnames(brain_age)[1] <- 'id'
brain_age <- brain_age[brain_age$Brain_age_corrected <= 100, ]
#brain_age$Brain_age_corrected <- ifelse(brain_age$Brain_age_corrected >100, 100, brain_age$Brain_age_corrected)
#brain_age$PAD <- brain_age$Brain_age_corrected - brain_age$Age
# 绘制条形图
library(ggplot2)
ggplot(brain_age, aes(x = PAD)) + geom_histogram(binwidth = 1, fill = 'skyblue', color = 'black') + theme_minimal()

load('data/cov/cov_clean.RData')
colnames(cov)
df <- merge(pro, brain_age, by = 'id')
df <- merge(df, cov, by = 'id')

#table(df$Diabetes)
#load('data/disease_baseline/baseline_disease.RData')
#df <- merge(df, baseline_disease, by = 'id')
#df <- df[df$DM_ba == 1,]

pro_f_lst <- names(pro)[-1] # 发现队列
#pro_f_lst <-  c('Gln', 'Glu', 'GlycA', 'Lactate', 'M-VLDL-C', 'M-VLDL-CE', 'S-HDL-L', 'S-HDL-PL', 'Unsaturation') # 验证队列
colnames(cov)
colnames(brain_age)

library(dplyr)
library(tibble)



# model 1
m1_f_lst <- c('age','sex', 'edu3', 'Ethnic_group', 'smoke', 'units', 'BMI', 'Towns')

myout_df <- tibble()
pro_out_lst <- c()
i <- 0
mydf <- df
#pro_f <- pro_f_lst[1]
for(pro_f in pro_f_lst) {
  i <- i + 1
  cat(i, pro_f, '\n')
  
  # 创建临时数据集
  tmpdf_f <- c('PAD', pro_f, m1_f_lst)
  tmpdf <- mydf[, tmpdf_f]
  names(tmpdf)[names(tmpdf) == pro_f] <- 'target_pro'
  
  # 移除缺失值
  rm_idx <- is.na(tmpdf$target_pro)
  tmpdf <- tmpdf[!rm_idx, ]
  
  # 拟合Cox模型
  try({#'age','sex', 'edu3', 'apoe_carrier'
    lm_model <- lm(PAD ~ age + sex + edu3 +Ethnic_group+smoke+units+BMI+Towns+ target_pro, data = tmpdf)
    hr <- coef(lm_model)['target_pro']
    lbd <- confint(lm_model)['target_pro', 1]
    ubd <- confint(lm_model)['target_pro', 2]
    pval <- summary(lm_model)$coefficients['target_pro', 'Pr(>|t|)']
    
    myout <- tibble(Beta = hr, Beta_Lower_CI = lbd, Beta_Upper_CI = ubd, Beta_p_val = pval)
    myout_df <- rbind(myout_df, myout)
    pro_out_lst <- c(pro_out_lst, pro_f)
  })
}

# 多重测试校正
myout_df <- as.data.frame(myout_df)
myout_df$Pro <- pro_out_lst
myout_df$Beta_p_val[is.na(myout_df$Beta_p_val)] <- 1
p_f_fdr <- p.adjust(myout_df$Beta_p_val, method = 'fdr')
p_f_bfi <- p.adjust(myout_df$Beta_p_val, method = 'bonferroni')

myout_df$p_val_fdr <- p_f_fdr
myout_df$p_val_bfi <- p_f_bfi


# 重新排列列
myout_df <- myout_df[, c('Pro', 'Beta', 'Beta_Lower_CI', 'Beta_Upper_CI', 'Beta_p_val', 'p_val_fdr', 'p_val_bfi')]
myout_df <- merge(myout_df, pro_code, by.x = 'Pro', by.y = 'Abbreviations')

write.csv(myout_df, 'Results/lm/pro_lm1.csv', row.names = F) # 发现队列
#write.csv(myout_df, 'Results/lm/pro_lm1_ins3.csv', row.names = F) # 验证队列


# pro analysis
pro_lm1 <- read.csv('Results/lm/pro_lm1.csv')
pro_lm1_bfi <- pro_lm1[pro_lm1$p_val_bfi < 0.05,]
pro_lm1_bfi_list <- pro_lm1_bfi$Metabolite
pro_lm1_bfi_list
nrow(pro_lm1_bfi)

```


