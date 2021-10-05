from django.db import models
from django.contrib.auth import get_user_model
import random

User = get_user_model()

from django.utils import tree
# Create your models here.


class ShoesType(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Status(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name+": "+str(self.id)



class Order(models.Model):
    statusD = (
    (0, 'Ожидается'),
    (1, 'В пути'),
    (2, 'Готово'),
    )
    statusClean = (
    (0, 'Ожидается'),
    (1, 'В процессе'),
    (2, 'Готово'),
    )
    name=models.CharField(max_length=255, blank=True, unique=True)
    delivery = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='orders')
    exportationStatus = models.IntegerField(default=0,choices=statusD)
    cleanStatus = models.IntegerField(default=0, choices=statusClean)
    statusDelivery = models.IntegerField(default=0, choices=statusD)
    status = models.ForeignKey(Status,default=1, on_delete=models.CASCADE)
    totalPrice = models.IntegerField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def generate_random_string(self,length,letters):
        rand_string = ''.join(random.choice(letters) for i in range(length))
        return rand_string

    def updateOrderPrice(self):
        totalPrice = 0
        for item in self.shoes_name.all():
            totalPrice += item.orderPrice
        
        self.totalPrice = totalPrice

        

    def save(self, *args, **kwargs):
        if self.totalPrice == 0:
            self.updateOrderPrice()

        if self.exportationStatus == 2:
            self.status_id = 2

        if self.exportationStatus == 2 and self.cleanStatus == 2:
            self.status_id = 3

        if self.exportationStatus == 2 and self.cleanStatus == 2 and self.statusDelivery == 2:
            self.status_id = 4

        if self.delivery:
            self.totalPrice = int(self.totalPrice) + 1000


        super(Order, self).save(*args, **kwargs)
        if self.name:
            return
        else:
            result = str(self.id)+self.generate_random_string(5,"pulito")
            self.name = f'#{result}'
            self.save()
        

    def __str__(self):
        return self.name

class Shoes(models.Model):
    mark = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    isDefect = models.BooleanField(default=False)
    orderPrice = models.IntegerField()
    unicId = models.CharField(max_length=255, null=True, blank=True)
    order = models.ForeignKey(Order, null=True, blank=True, on_delete=models.CASCADE,related_name="shoes_name")

    def __str__(self):
        return f"Mark: {self.mark} - Name:{self.name}"


class OrderRate(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    rate = models.IntegerField(null=True,blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='order_rates',blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="order_rates")

    def __str__(self):
        return self.title

def upload_to(instance, filename):
    return f"photos/{filename}"

class OrderRateImages(models.Model):

    image = models.ImageField(upload_to=upload_to)
    order_rate = models.ForeignKey(OrderRate, on_delete=models.CASCADE,related_name="order_rate_images")



    
        
        
        
