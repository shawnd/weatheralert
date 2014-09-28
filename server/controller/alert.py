#Alert Controller - Sends alerts to user devices depending on proximity to alert and if alert has been sent already or not

#LOOP #analyze data -- check in timespan
    #sql postgis
        #check disaster geom and see if there is a radius including user
            #if user in radius send alert && alert already not sent
            
            #!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import time
import thread
import psycopg2

conn = psycopg2.connect('dbname=weatheralert user=postgres')
cur = conn.cursor()

EARTHQUAKE_MAGNITUDE_THRESHOLD = 1


# function get x data source

def analyzeEarthquakeData():
    print 'Analyze quake'
    sql_analyze = "SELECT DISTINCT * FROM disasters ORDER BY date DESC"
    try:
        cur.execute(sql_analyze)
        row = cur.fetchone()
        while row != []:
            print row[0]
            row = cur.fetchone()
    except Exception:
        pass
    


# loop #get info every x minutes per data source

def runAlerts():
    while True:

        # thread.start_new_thread(getHurricaneData, ())

        thread.start_new_thread(analyzeEarthquakeData, ())

        # thread.start_new_thread(getTsunamiData, ())

        time.sleep(60)
