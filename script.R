library(jsonlite)
library(dplyr)
library(plyr)
library(readr)
library(tidyr)
library(googlesheets)
library(ggplot2)

setwd("~/Projects/ona-scraper/")

df06 <- fromJSON("data/ona06.json")
df07 <- fromJSON("data/ona07.json")
df08 <- fromJSON("data/ona08.json")
df10 <- fromJSON("data/ona10.json")
df12 <- fromJSON("data/ona12.json")
df13 <- fromJSON("data/ona13.json")
df14 <- fromJSON("data/ona14.json")
df15 <- fromJSON("data/ona15.json")
df16 <- fromJSON("data/ona16.json")
df17 <- fromJSON("data/ona17.json")
df09 <- fromJSON("data/ona09.json")
df11 <- fromJSON("data/ona11.json")

df <- bind_rows(df06, df07, df08, df09, df10, df11, df12, df13,df14, df15, df16, df17)

shuffle <- df[sample(nrow(df)),]

write_csv(select(shuffle, -hours), "data/data.csv", na = "")
write_csv(df_latest, "data/latest.csv", na = "")

# Get data from gdocs
gs <- gs_url("https://docs.google.com/spreadsheets/d/1A6XDsmHAVk_gC3Uudx8jBZvci66VLXQ-bqSxpj00jnM")
gs_df <- gs_read(gs)
gs_chart <- gs_read(gs, ws = "export")

long <- gather(gs_chart, edition, pct, pct_2006:pct_2017)
long$edition <- substr(long$edition, 5, 9)

# charts ------------------------------------------------------------------
ggplot(gs_df, aes(edition)) +
  geom_bar(stat = 'count') +
  facet_wrap(~top_cat)

slope <- filter(long, edition == 2006 | edition == 2017, categories != 'general')

ggplot(slope, aes(edition, pct, group = categories, color = categories)) +
  geom_line() +
  facet_wrap(~categories)

write_csv(slope, "data/chart.csv")
