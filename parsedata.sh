#!/usr/bin/bash

genId() {
    echo $(( $RANDOM % 10 ))$(( $RANDOM % 10 ))-$(( $RANDOM % 10 ))$(( $RANDOM % 10 ))$(( $RANDOM % 10 ))
}

if [ $# -eq 0 ]; then
    exit 1
fi

echo 'export const data = ['
cat $1 | while read line; do
    set -- $line
    id="'"$(genId)"'"
    fname="'"${3//$'n'}"'"
    lname="'"$2"'"
    echo -n '    '
    echo '{' id: $1, "'"name"'": '{' "'"firstName"'": $fname, "'"lastName"'": $lname '},' "'"studentId"'": $id '},'
done
echo
echo ']'