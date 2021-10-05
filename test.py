# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = "AC347a99f02384d0f79e6475357ab05876"
auth_token = "b7ea46c3f79e7cd642b581dfa796ed69"
client = Client(account_sid, auth_token)

message = client.messages.create(  
                              messaging_service_sid='MG00294dc3bbc107ca26cb8802195f3dd5', 
                              body='hello world',      
                              to='+77477781004' 
                          ) 

print(message.sid)