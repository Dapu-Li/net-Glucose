---
outline: deep
---

# s4_calclate_formal.R

::: warning
Copyright © 2025-present Zhirong Li. 
If U use, plz cite.
:::

```R
rm(list = ls())
setwd("C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure")

library(readxl)

cer <- read_excel("res.xlsx", sheet = "cer")
cor <- read_excel("res.xlsx", sheet = "cor")
sub <- read_excel("res.xlsx", sheet = "sub")

generate_expression1 <- function(data) {
  atlas_order <- data$Atlas_order
  data$a...5 <- round(data$a...5, 3)
  values <- data$a...5 * (1000)
  expression <- paste0("i", atlas_order, "*(", values, ")")
  expression <- paste(expression, collapse = "+")
  return(expression)
}

generate_expression <- function(data) {

  data <- data[order(data$Atlas_order), ]
  
  expression_list <- rep(0, nrow(data))  
  
  for (i in 1:nrow(data)) {
    atlas_index <- data$Atlas_order[i]
    value <- round(data$a...5[i], 3) * 1000
    expression_list[atlas_index] <- value
  }
  
  expression <- paste(expression_list, collapse = ",")
  return(expression)
}

expression_cer <- generate_expression(cer)
expression_cor <- generate_expression(cor)
expression_sub <- generate_expression(sub)


final_output <- paste(expression_cer, expression_cor, expression_sub, sep = "\n")

write(final_output, "final_output.txt")

cat(final_output)

```