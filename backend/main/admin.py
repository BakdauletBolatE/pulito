from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Order)
admin.site.register(Status)
admin.site.register(ShoesType)
admin.site.register(Shoes)
admin.site.register(OrderRate)
admin.site.register(OrderRateImages)