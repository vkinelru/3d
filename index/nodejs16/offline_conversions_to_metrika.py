
import requests

counter = 123456
token = "token";

file = open("offline-conversions.csv", "r").read()
id_type = "CLIENT_ID"

url = "https://api-metrika.yandex.net/management/v1/counter/{}/offline_conversions/upload?client_id_type={}".format(counter, id_type)
headers = {
 "Authorization": "OAuth {}".format(token)
}

req = requests.post(url, headers=headers, files={"file":file})
