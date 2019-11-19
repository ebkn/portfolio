#!/bin/bash

if [ "$FILENAME" = '' ]; then
  echo "FILENAME is empty"
  exit 1
fi

DATE=$(date "+%Y-%m-%dT%H:%M:%S+09:00")

mkdir -p content/blog/$FILENAME

cat <<EOF >> content/blog/$FILENAME/index.md
---
title: 
date: "$DATE"
description: 
---

EOF

echo "content/blog/$FILENAME/index.md created."
