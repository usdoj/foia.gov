#!/usr/local/bin/bash
start=$SECONDS
set -B

# Generates xml dataset by year for Dataset Download Page
# https://www.foia.gov/foia-dataset-download.html
# USAGE: bash xml-dataset-download.sh <year> <api_key>
# EXAMPLE: bash xml-dataset-download.sh 2023 N4aCuDuJO8Ucf1FTR2EzVPZqo8NsSl1c7YLYOk8N
# CURL: curl -H "X-API-Key: N4aCuDuJO8Ucf1FTR2EzVPZqo8NsSl1c7YLYOk8N" https://api.foia.gov/api/annual-report-xml/ibwc/2023 -o test.xml

YEAR=$1
API_KEY=$2

case $YEAR in
    2011 | 2010 | 2009 | 2008)
    declare -a agencies=(usibwc abmc acus nrpc usagm ceq cftc cia cigie cncs cppbsd cpsc csb csosa dhs dnfsb doc dod doe doi doj dol dot ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gsa hhs hud iaf ibwc imls lsc mcc mspb nara nasa ncpc ncua nea neh nigc nmb nrc nlrb nsf ntsb odni oge omb ondcp onhir opic opm oshrc ostp pbgc pc prc usrrb sba sec sigar ssa sss dos stb treasury tva usadf usaid usccr co usda usitc usps ustda ustr va osc sigir)
    ;;
  2012)
    declare -a agencies=(usibwc ratb afrh abmc acus nrpc usagm ceq cftc cia cigie cncs cppbsd cpsc csb csosa dhs dnfsb doc dod doe doi doj dol dot ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gsa hhs hud iaf ibwc imls lsc mcc mspb nara nasa ncpc ncua nea neh nigc nmb nrc nlrb nsf ntsb odni oge omb ondcp onhir opic opm oshrc ostp pbgc pc prc usrrb sba sec sigar ssa sss dos stb treasury tva usadf usaid usccr co usda usitc usps ustda ustr va osc sigir)
    ;;
  2013)
    declare -a agencies=(opic usibwc abmc acus nrpc afrh usagm ceq cfpb cftc cia cigie cncs cppbsd cpsc csb csosa dhs dnfsb doc dod doe doi doj dol dot ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gsa hhs hud iaf ibwc imls lsc mcc mspb nara nasa ncpc ncua nea neh nigc nmb nrc nlrb nsf ntsb odni oge omb ondcp onhir dfc opm oshrc ostp pbgc pc prc usrrb sba sec sigar ssa sss dos stb treasury tva usadf usaid usccr co usda usitc usps ustda ustr va ratb osc)
    ;;
  2014)
    declare -a agencies=(opic usibwc abmc acus afrh usagm ceq cfpb cftc cia cigie cncs cppbsd cpsc csb csosa dhs dnfsb doc dod doe doi doj dol dot ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gsa hhs hud iaf ibwc imls lsc mcc mspb nara nasa ncpc ncua nea neh nigc nmb nrc nlrb nsf ntsb odni oge omb ondcp onhir dfc opm oshrc ostp pbgc pclob pc prc usrrb sba sec sigar ssa sss dos stb treasury tva usadf usaid usccr co usda usitc usps ustda ustr va ratb)
    ;;
  2015)
    declare -a agencies=(opic usibwc abmc acus afrh usagm ceq cfpb cftc cia cigie cncs cppbsd cpsc csb csosa dhs dnfsb doc dod doe doi doj dol dot ed eeoc epa  fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gsa hhs hud iaf ibwc imls lsc mcc mspb nara nasa ncpc ncua nea neh nigc nmb nrc nrcp nlrb nsf ntsb odni oge omb ondcp onhir dfc opm osc oshrc ostp pbgc pclob pc prc usrrb sba sec sigar ssa sss dos stb treasury tva usab usadf usaid usccr co usda usitc usps ustda ustr va)
    ;;
  2016 | 2017)
    declare -a agencies=(opic abmc acus afrh asc ceq cfa cfpb cftc cia cigie co cncs cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi doj dol dos dot eac ed eeoc epa  fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmshrc fmcs fomc frb frtib ftc tva gcerc gsa hhs hstsf hud iaf imls jmmff lsc mcc mkuf mmc mspb nara nasa ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt sba sec sigar ssa ssab sss stb treasury usab usadf usagm usaid usccr usda usibwc usich usip usitc usps usrrb ustda ustr va)
    ;;
  2018)
    declare -a agencies=(opic abmc achp acus afrh asc ceq cfa cfpb cftc cia cigie co cncs cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi doj dol dos dot eac ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmshrc fmcs fomc frb frtib ftc tva gcerc gsa hhs hstsf hud iaf imls jmmff lsc mcc mkuf mmc mspb nara nasa ncmnps ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt sba sec sigar ssa ssab sss stb treasury usab usadf usagm usaid usccr usda usibwc usich usip usitc usps usrrb ustda ustr va)
    ;;
  2019)
    declare -a agencies=(opic abmc achp acus afrh asc ceq cfa cfpb cftc cia cigie co cncs cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi doj dol dos dot eac ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmshrc fmcs fomc frb frtib ftc tva gcerc gsa ha hhs hstsf hud iaf imls jmmff lsc mcc mkuf mmc mspb nara nasa ncmnps ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt sba sec sigar ssa ssab sss stb treasury usab usadf usagm usaid usccr usda usibwc usich usip usitc usps usrrb ustda ustr va)
    ;;
  2020)
    declare -a agencies=(abmc achp acus afrh asc ceq cfa cfpb cftc cia cigie co cncs cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi doj dol dos dot eac ed eeoc epa ex-im bank fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmshrc fmcs fomc frb frtib ftc tva gcerc gsa ha hhs hstsf hud iaf imls jmmff lsc mcc mkuf mmc mspb nara nasa ncmnps ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nscai nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt sba sec sigar ssa ssab sss stb treasury usab usadf usagm usaid usccr usda usibwc usich usip usitc usps usrrb ustda ustr va)
    ;;
  2021)
    declare -a agencies=(abmc doj achp acus afrh asc ceq cfa cfpb cftc cia cigie cncs co cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi dol dos dot eac ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gcerc gsa ha hhs hstsf hud iaf imls ipec fpisc jmmff lsc mcc mkuf mmc mspb nara nasa ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt usrrb sba sec sigar ssa ssab sss stb treasury tva usab usadf usagm usaid usccr usda usibwc usich usip usitc usps ustda ustr va)
    ;;
  2022)
    declare -a agencies=(abmc doj achp acus afrh asc ceq cfa cfpb cftc cia cigie cncs co cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi dol dos dot eac ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gcerc gsa ha hhs hstsf hud iaf imls ipec fpisc jmmff lsc mcc mkuf mmc mspb nara nasa ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt usrrb sba sec sigar ssa ssab sss stb treasury tva usab usadf usagm usaid usccr usda usibwc usich usip usitc usps ustda ustr va)
    ;;
  2023)
    declare -a agencies=(oncd abmc doj achp acus afrh asc ceq cfa cfpb cftc cia cigie cncs co cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi dol dos dot eac ed eeoc epa fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gcerc gsa ha hhs hstsf hud iaf imls ipec fpisc jmmff lsc mcc mkuf mmc mspb nara nasa ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt usrrb sba sec sigar ssa ssab sss stb treasury tva usab usadf usagm usaid usccr usda usibwc usich usip usitc usps ustda ustr va)
    ;;
  *)
    echo -n "Year unavailable: ${YEAR}"
    exit;
    ;;
esac

agencies+=("exim%20bank") # hardcode exim bank which exists in all years

# Exit if there aren't two arguments
if [ $# != 2 ]
  then
    echo "Please supply the year and api key."
    echo "USAGE: bash xml-dataset-download.sh <year> <api_key>"
    exit;
fi

echo "This script will output a zip file in the public directory: bin/xml-datasets/files/$YEAR-FOIASetFull.zip"

newDir="files/${YEAR}"

if ! [[ -d "$newDir" ]] ; then
  echo -e "Creating new directory $newDir \n"
   mkdir -p "$newDir"
fi

for AGENCY in "${agencies[@]}"
do
   :
  echo -e "Getting XML data for ${AGENCY}... \n"
  sleep 1
  CLEAN=${AGENCY//%20/-}
  FILE=files/${YEAR}/${CLEAN}-${YEAR}'.xml'
  curl -H "X-API-Key: $API_KEY" 'https://api.foia.gov/api/annual-report-xml/'$AGENCY'/'$YEAR -o $FILE
  if grep -Fxq "Report not found." $FILE
  then
    echo -e "Report not found for this agency: $AGENCY $YEAR \n"
    rm -r $FILE
  fi

  # Unpublished agency report causes this error
  if grep -Fxq "Report not complete." $FILE
  then
    echo -e "Report not complete: $AGENCY $YEAR \n"
    rm -r $FILE
  fi
done

echo -e "Zipping all XML files for the year ${YEAR}... \n"
zip -r -j zips/$YEAR-FOIASetFull.zip files/$YEAR/*.xml
#echo -e "Removing all XML files from this directory... \n"
#rm -r files/$YEAR/*.xml # leave files but use gitignore for testing
duration=$(( SECONDS - start ))
echo -e "You can now manually place the zip files into the www.foia.gov directory..."
echo -e "Finished in ${duration} seconds"
echo -e "**********\n"
