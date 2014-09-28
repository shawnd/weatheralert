import psycopg2

conn = psycopg2.connect("dbname=weatheralert user=postgres")

cur = conn.cursor()