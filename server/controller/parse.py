#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import urllib2
import time
import thread
import psycopg2

conn = psycopg2.connect('dbname=weatheralert user=postgres')
cur = conn.cursor()

EARTHQUAKE_MAGNITUDE_THRESHOLD = 1


# function get x data source

def getHurricaneData():
    print 'HURRICANE'
    urllib2.urlopen('http://api.wunderground.com/api/9779b7eac702674c/currenthurricane/view.json'
                    )


def getEarthquakeData():
    print 'QUAKE'

    data = \
        urllib2.urlopen('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson'
                        )
    response = data.read()
    data.close()

    eqData = json.loads(response)
    if eqData['metadata']['count']:
        eqDataCount = eqData['metadata']['count']
        eqSQLInsert = \
            'INSERT INTO disasters (type, lat, lon, geom, date, category, tracking_id) VALUES '
        eqSQLValues = ''
        print 'Data entries found: ' + str(eqDataCount)
        while eqDataCount > 0:
            eqDataCount = eqDataCount - 1
            if eqData['features'][eqDataCount]['properties']['mag'] \
                > EARTHQUAKE_MAGNITUDE_THRESHOLD:
                lon = str(eqData['features'][eqDataCount]['geometry']['coordinates'][0])
                lat = str(eqData['features'][eqDataCount]['geometry']['coordinates'][1])
                geom = 'ST_SetSRID(ST_Point(' + lon + ', ' + lat \
                    + '),4326)'
                mag = str(eqData['features'][eqDataCount]['properties']['mag'])
                tracking = str(eqData['features'][eqDataCount]['properties']['code'])
                eqSQLValues = eqSQLValues + "(\'eq\', \'" + lat \
                    + "\', \'" + lon + "\', " + geom + ", now(), \'" \
                    + mag + "\', \'" + tracking + "\')"

                if eqDataCount != 0:
                    eqSQLValues = eqSQLValues + ', '
                else:
                    query = eqSQLInsert + eqSQLValues
                    print query
                    try:
                        cur.execute(query)
                        conn.commit()
                    except Exception:
                        pass
    else:
        print 'no warnings'


def getTsunamiData():
    print 'TSUNAMI'


# loop #get info every x minutes per data source

def runParse():
    while True:

        # thread.start_new_thread(getHurricaneData, ())

        thread.start_new_thread(getEarthquakeData, ())

        # thread.start_new_thread(getTsunamiData, ())

        time.sleep(60)
