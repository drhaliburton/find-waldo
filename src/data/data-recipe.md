Install json2csv

    npm install json2csv

Fetch records

    wget http://directory-api-dev.ynet.gov.yk.ca/employees -o employees.json


Manually:

 - trim `count` and `employees` from beginnin of json record (trailing braces too)
- Convert to csv
- In excel
    - copy 'office' to 'address' where office contains address
    - discard records where address is empty or is PO Box or otherwise not a street address
    
- in ArcGIS Online geocode the csv file
- remove records which are outside of YT or otherwise obviously broken
- export csv

