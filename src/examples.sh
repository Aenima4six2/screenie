#!/bin/bash
set -e

# Set this to port 80 if you are running in docker
screenie_host=${1:-localhost:3000}

curl -X POST \
  http://$screenie_host/api/dashboards \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '    {
        "name": "Test Dashboard",
        "layout": {
            "panes": 1
        },
        "isActive": true,
        "pages": [
            {
                "name": "Google Drive",
                "ordinal": 3,
                "url": "https://docs.google.com/spreadsheet/pub?key=0AmwAunwURQNsdFplUTBZUTRLREtLUDhabGxBMHBRWmc&embedded=true",
                "isActive": true,
                "interval": 4,
                "forceProxy": false
            },
            {
                "ordinal": 1,
                "url": "https://demo.geckoboard.com/dashboards/03CF7FF63ED2B885",
                "name": "Gecko Board",
                "isActive": true,
                "interval": 5,
                "forceProxy": false
            }
        ]
    }'