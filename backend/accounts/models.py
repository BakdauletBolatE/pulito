from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import random


class UserAccountManager(BaseUserManager):
    def create_user(self,email, number_phone=None, name=None, password=None):
       
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name,number_phone=number_phone)

        def generate_random_string(length,letters):

            rand_string = ''.join(random.choice(letters) for i in range(length))
            return rand_string

        if password is None:
            password = generate_random_string(10,"qwertyuiolp[]asdfghjklzxcbm,123475698")
            user.set_password(password)
        else:        
            user.set_password(password)
        
        user.save()

        return user

    def create_superuser(self, email, number_phone,is_superuser,  name, password=None):
        
        
        user = self.model(email=email, number_phone=number_phone, name=name, is_superuser=True, is_staff=True)
        user.set_password(password)
        user.save()

        return user





class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, null=True, blank=True, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_courier = models.BooleanField(default=False)

    number_phone=models.CharField(max_length=15, null=True, blank=True, unique=True)
    telegram_chat_id=models.CharField(max_length=255, null=True, blank=True)


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['number_phone', 'name','is_superuser']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return str(self.name)


class AccountSmsVerification(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE,related_name='smscode')
    code = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return str(self.code)

    def save(self, *args, **kwargs):
        
        self.code = random.sample(range(10**(6-1), 10**6), 1)[0]
        super().save(*args, **kwargs)

