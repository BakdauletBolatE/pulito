from django.contrib import admin
from .models import AccountSmsVerification, UserAccount
# Register your models here.


admin.site.register(UserAccount)
admin.site.register(AccountSmsVerification)