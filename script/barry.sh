#!/bin/bash/expect -f
#: Title        : barry
#: Date         : 2008-11-26
#: Author       : "Aboubacar Barry" <codeurabou123@gmail.com>
#: Version      : 1.0
#: Description  : Get your server ip fast with just type domain name : it is a top level of nslookup command
#: Options      : No options


# Parse script argument
# while [ $# -gt 0 ]; do
#     if [[ $1 == "--"* ]]; then
#         v="${1/--/}"
#         declare "$v"="$2"
#         shift
#     fi
#     shift
# done

# script first param
domain=$1
if [ $domain ]; then
    nslookup $domain | head -6 | tail -1 | cut -d" " -f2
else 
    echo "Oups : Give me domaine name like : something.aboucodeur.something"
fi