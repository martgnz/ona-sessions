library(jsonlite)
library(dplyr)
library(readr)
library(googlesheets)

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

df <- bind_rows(df06, df07, df08, df10, df12, df13,df14, df15, df16, df17)

shuffle <- df[sample(nrow(df)),]

write_csv(select(shuffle, -hours), "data/data.csv", na = "")

# Get data from gdocs
gs <- gs_url("https://docs.google.com/spreadsheets/d/1A6XDsmHAVk_gC3Uudx8jBZvci66VLXQ-bqSxpj00jnM")
gs_df <- gs_read(gs)

write_csv(gs_df, "data/categorised.csv")