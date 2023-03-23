#!/bin/bash
start=$SECONDS
set -B
declare -a agencies=(abmc doj achp acus afrh asc ceq cfa cfpb cftc cia cigie cncs co cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi dol dos dot eac ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gcerc gsa ha hhs hstsf hud iaf imls jmmff lsc mcc mkuf mmc mspb nara nasa ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nscai nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt rrb sba sec sigar ssa ssab sss stb treasury tva usab usadf usagm usaid usccr usda usibwc usich usip usitc usps ustda ustr va)
agencies+=("exim%20bank")

YEAR=$1
API_KEY=$2

# if there aren't two arguments
if [ $# != 2 ]
  then
    echo "Please supply the year and api key.\nUSAGE: bash xml-dataset-download.sh <year> <api_key>"
    exit;
fi

echo "This script will output a zip file in the public directory: www.foia.gov/$YEAR-FOIASetFull.zip"

for AGENCY in "${agencies[@]}"
do
   :
  echo -e "Getting XML data for ${AGENCY}... \n"
  sleep 1
  CLEAN=${AGENCY//%20/-}
  FILE=${CLEAN}-${YEAR}'.xml'
  curl -H "X-API-Key: $API_KEY" 'https://api.foia.gov/api/annual-report-xml/'$AGENCY'/'$YEAR -o $FILE
done

echo -e "Zipping all XML files for the year ${YEAR}... \n"
sleep 1
zip -r -j ../www.foia.gov/$YEAR-FOIASetFull.zip *.xml
echo -e "Removing all XML files from this directory... \n"
rm -r *.xml
duration=$(( SECONDS - start ))
echo -e "Finished in ${duration} seconds"
echo -e "**********\n"
