#!/bin/bash
# from: https://peniwize.wordpress.com/2011/04/09/how-to-read-all-lines-of-a-file-into-a-bash-array/


readarrayfunc() {
  local __resultvar=$1
  declare -a __local_array
  let i=0
  while IFS=$'\n' read -r line_data; do
      __local_array[i]=${line_data}
      ((++i))
  done < $2
  if [[ "$__resultvar" ]]; then
    eval $__resultvar="'${__local_array[@]}'"
  else
    echo "${__local_array[@]}"
  fi
}
