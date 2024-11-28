#!/usr/bin/zsh

YEAR=$1
DAY=$2

if [ -d "$YEAR/$DAY" ]; then
    echo "Folder $YEAR/$DAY already exists."
else
  mkdir -p $YEAR/$DAY
  cp -r templates/* $YEAR/$DAY 
fi