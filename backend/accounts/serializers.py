from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import AccountSmsVerification
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import get_user_model


User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = User
        fields = ('id', 'number_phone','email','telegram_chat_id','name','is_superuser')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class AccountSMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountSmsVerification
        fields = ('user_id')

    def create(self,validated_data):
        sms_code = AccountSmsVerification.objects.create(**validated_data)
        return sms_code


class TokenCreateWithPhoneSerializer(serializers.Serializer):
    username_field = get_user_model().USERNAME_FIELD

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)
    def validate(self, attrs):
        self.user = User.objects.get(number_phone=attrs['number_phone'])
        refresh = self.get_token(self.user)
        data = {}
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
        