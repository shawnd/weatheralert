#Alert Controller - Sends alerts to user devices depending on proximity to alert and if alert has been sent already or not

#LOOP #analyze data -- check in timespan
    #sql postgis
        #check disaster geom and see if there is a radius including user
            #if user in radius send alert && alert already not sent