---
outline: deep
---

# s0_cov_clean.R

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz site.
:::

```R
rm(list = ls())
setwd("~/Desktop/diabete_metabolism_brain")
load('data/cov/cov.RData')

colnames(cov)
cov$hyper <- as.factor(cov$hyper)
cov$apoe_carrier <- as.factor(cov$apoe_carrier)
cov$CVD <- as.factor(cov$CVD)
col_f <- colnames(cov)[sapply(cov, is.factor)]
col_c <- colnames(cov)[sapply(cov, is.character)]
col_c <- c(col_f, col_c)

col_n <- colnames(cov)[sapply(cov, is.numeric)]
col_n <- col_n[!col_n %in% c('id')]
col_c;col_n
col <- c(col_c, col_n)

missing_count <- sapply(cov[col], function(x) {
  sum(is.na(x))})

missing_ratio <- sapply(cov[col], function(x) {
  round(sum(is.na(x)) / length(x) * 100, 2)})

print(missing_count)
print(missing_ratio)

# 中位数填充 col_n
for (i in col_n) {
  cov[is.na(cov[, i]), i] <- median(cov[, i], na.rm = TRUE)
}

# 对于 col_c，确保它是字符型，然后用 "Unknown" 填充
for (i in col_c) {
  if (is.factor(cov[, i])) {
    cov[, i] <- as.character(cov[, i])  # 转换因子为字符类型
  }
  cov[is.na(cov[, i]), i] <- "Unknown"
}
table(cov$apoe_carrier)
colnames(cov)
cov$smoke <- ifelse(cov$smoke == "Prefer not to answer", "Unknown", cov$smoke)
prs_stroke <- read.csv('data/ad_pd_stroke_ba/stroke_prs.csv')
colnames(prs_stroke) <- c('id', 'prs_stroke')
cov <- merge(cov, prs_stroke, by = 'id', all = TRUE)
sum(is.na(cov$prs_stroke))
summary(cov$prs_stroke)
#中位数填充
cov$prs_stroke <- ifelse(is.na(cov$prs_stroke), median(cov$prs_stroke, na.rm = T), cov$prs_stroke)
save(cov, file = 'data/cov/cov_clean.RData')
```


