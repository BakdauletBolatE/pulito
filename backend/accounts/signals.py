from accounts.models import UserAccount
from .models import AccountSmsVerification
from django.db.models.signals import post_save
from django.dispatch import receiver
from twilio.rest import Client


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = "AC347a99f02384d0f79e6475357ab05876"
auth_token = "b7ea46c3f79e7cd642b581dfa796ed69"
client = Client(account_sid, auth_token)



# @receiver(post_save, sender=UserAccount)
# def post_save_generete_code(sender,instance, created, *args, **kwargs):
#     if created:
#         code = AccountSmsVerification.objects.create(user=instance)
#         message = client.messages.create(  
#                               messaging_service_sid='MG00294dc3bbc107ca26cb8802195f3dd5', 
#                               body=code,      
#                               to=f'+{instance.number_phone}' 
#                           ) 
#     else:
#         try:
#             code = AccountSmsVerification.objects.get(user=instance)
#             code.save()
#             message = client.messages.create(  
#                               messaging_service_sid='MG00294dc3bbc107ca26cb8802195f3dd5', 
#                               body=code,  
#                               to=f'+{instance.number_phone}' 
#                           ) 
#         except AccountSmsVerification.DoesNotExist:
#             code = AccountSmsVerification.objects.create(user=instance)
#             message = client.messages.create(  
#                               messaging_service_sid='MG00294dc3bbc107ca26cb8802195f3dd5', 
#                               body=code,     
#                               to=f'+{instance.number_phone}' 
#                           ) 
        