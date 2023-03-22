set -B
declare -a agencies=(abmc doj achp acus afrh asc ceq cfa cfpb cftc cia cigie cncs co cppbsd cpsc csb csosa dc dfc dhs dnfsb doc dod doe doi dol dos dot eac ed eeoc epa exim fca fcc fcsic fdic fec ferc ffiec fhfa flra fmc fmcs fmshrc fomc frb frtib ftc gcerc gsa ha hhs hstsf hud iaf imls jmmff lsc mcc mkuf mmc mspb nara nasa ncd ncpc ncua nea neh nigc nlrb nmb nrc nrpc nscai nsf ntsb nw nwtrb odni oge omb ondcp onhir opm osc oshrc ostp pbgc pc pclob prc pt rrb sba sec sigar ssa ssab sss stb treasury tva usab usadf usagm usaid usccr usda usibwc usich usip usitc usps ustda ustr va)

for AGENCY in "${agencies[@]}"
do
   :

    for i in {2021..2022}; do
      sleep 1
      curl -H 'X-API-Key: N4aCuDuJO8Ucf1FTR2EzVPZqo8NsSl1c7YLYOk8N' 'https://api.foia.gov/api/annual-report-xml/'$AGENCY'/'$i -o $AGENCY'-'$i'.xml'
    done

done
