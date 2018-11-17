Install json2csv

    npm install json2csv

Fetch records

    wget http://directory-api-dev.ynet.gov.yk.ca/employees -o employees.json


Manually:

 - trim `count` from beginning of json record (trailing brace too)
- Convert to csv

    `json2csv --excel-strings --flatten --input \Work\HackYG\employees.json --output employees.csv`

- In excel
    - copy 'office' to 'address' where office contains address
    - discard records where address is empty or is PO Box or otherwise not a street address
    
- in ArcGIS Online geocode the csv file
- remove records which are outside of YT or otherwise obviously broken
- download as file-gdb. **Note** this drops the non-geocoded records
- in ArcGIS Pro
    - move points from Saskatchewan, Ontario etc. to YT communities (Mayo in particular)
    - project to decimal degrees
    - calculate geometry X,Y to Lat,Long columns
    - MERGE back in the dropped non-geocoded records
        - JOIN fixed geometry table to pre-gecoded CSV file
        - update Lat,Long columns from joined geocoded table
        - remove join
    - export cleaned, geocoded and merged records:
      `employees_cleaned_geocoded_merged.csv`

