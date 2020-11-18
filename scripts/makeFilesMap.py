import csv

femaleSummer = dict()
femaleWinter = dict()
maleSummer = dict()
maleWinter = dict()

countryCode = dict()


allYears = ['1900', '1904', '1906', '1908', '1912', '1920', '1924', '1928', '1932', '1936', '1948', '1952', '1956', '1960', '1964', '1968', '1972', '1976', '1980', '1984', '1988', '1992', '1996', '2000', '2004', '2008', '2012', '2016']

count=0
file = open('../raw_data/noc_regions2.csv', 'r')
for line in file:
    if count==0:
        count+=1
        continue
    values = line.split(",")
    countryCode[values[0]] = values[1]

# print countryCode

with open('../raw_data/athlete_events.csv') as csv_file2:
    csv_reader = csv.reader(csv_file2, delimiter=',')
    count = 0

    for row in csv_reader:

        if count==0:
            count+=1
            continue

        # count+=1
        # if count>200:
            # break

        number = row[0]
        name = row[1]
        sex = row[2]
        try:
            country = countryCode[row[7]]
        except:
            country = row[6].split("/")[0]
        year = row[9]
        season = row[10]
        sport = row[12]


        if sex=="F" and season == "Summer":
            if country in femaleSummer:
                if year in femaleSummer[country]:
                    femaleSummer[country][year]+=1
                else:
                    femaleSummer[country][year]=1
            else:
                temp = dict()
                temp[year] = 1
                femaleSummer[country] = temp





# print femaleSummer.keys()

# allCountries = femaleSummer.keys()
# allCountries.sort()
# print allCountries


# for i in allYears:
#     print i



tsv_file = open("../individual_viz/map/world_population.tsv")
read_tsv = csv.reader(tsv_file, delimiter="\t")

allRows = []

first = 0

for row in read_tsv:
  # print(row[1])

    if first == 0:
        first = 1
        continue

    try:
        # print(femaleSummer[row[1]])

        if row[1] in femaleSummer:
            countryData = femaleSummer[row[1]]
        elif row[0] in femaleSummer:
            countryData = femaleSummer[row[0]]
        else:
            print row[1]
            countryData = femaleSummer[row[1]]

        temp = []
        temp.append(row[0])
        temp.append(row[1])

        for i in allYears:
            if i in countryData:
                temp.append(countryData[i])
            else:
                temp.append(0)

        allRows.append(temp)

    except:
        temp = []
        temp.append(row[0])
        temp.append(row[1])
        for i in allYears:
            temp.append(0)
        allRows.append(temp)



for i in allRows:
    print i


# with open('../individual_viz/map/country_participation.tsv', 'w') as out_file:
#     tsv_writer = csv.writer(out_file, delimiter='\t')
#     tsv_writer.writerow(['id', 'name', '1900', '1904', '1906', '1908', '1912', '1920', '1924', '1928', '1932', '1936', '1948', '1952', '1956', '1960', '1964', '1968', '1972', '1976', '1980', '1984', '1988', '1992', '1996', '2000', '2004', '2008', '2012', '2016'])

#     for i in allRows:
#         tsv_writer.writerow(i)

#
# # Write Female Summer File
# fh = open('../processed_data/summer/female/data.csv', 'w')
# fh.write("year,participants,countries,sports\n")
# for i in femaleSummer:
#     year = i
#     participants = len(femaleSummer[i]["names"])
#     countries = ""
#     for j in femaleSummer[i]["countries"]:
#         countries += j + ";"
#     sports = ""
#     for j in femaleSummer[i]["sports"]:
#         sports += j + ";"
#     fh.write(year + "," + str(participants) + "," + countries + "," + sports + "\n")
# fh.close()
#
#
# # Write Male Summer File
# fh = open('../processed_data/summer/male/data.csv', 'w')
# fh.write("year,participants,countries,sports\n")
# for i in maleSummer:
#     year = i
#     participants = len(maleSummer[i]["names"])
#     countries = ""
#     for j in maleSummer[i]["countries"]:
#         countries += j + ";"
#     sports = ""
#     for j in maleSummer[i]["sports"]:
#         sports += j + ";"
#     fh.write(year + "," + str(participants) + "," + countries + "," + sports + "\n")
# fh.close()
#
#
# # Write Female Winter File
# fh = open('../processed_data/winter/female/data.csv', 'w')
# fh.write("year,participants,countries,sports\n")
# for i in femaleWinter:
#     year = i
#     participants = len(femaleWinter[i]["names"])
#     countries = ""
#     for j in femaleWinter[i]["countries"]:
#         countries += j + ";"
#     sports = ""
#     for j in femaleWinter[i]["sports"]:
#         sports += j + ";"
#     fh.write(year + "," + str(participants) + "," + countries + "," + sports + "\n")
# fh.close()
#
#
# # Write Male Winter File
# fh = open('../processed_data/winter/male/data.csv', 'w')
# fh.write("year,participants,countries,sports\n")
# for i in maleWinter:
#     year = i
#     participants = len(maleWinter[i]["names"])
#     countries = ""
#     for j in maleWinter[i]["countries"]:
#         countries += j + ";"
#     sports = ""
#     for j in maleWinter[i]["sports"]:
#         sports += j + ";"
#     fh.write(year + "," + str(participants) + "," + countries + "," + sports + "\n")
# fh.close()
#
#
#
#
#


# CUSTOM FILES

# 1. File for Female,Summer -> ID, Country, 1984,


# allYears = femaleSummer.keys()
# allYears.sort()

# print femaleSummer['1900']





#
