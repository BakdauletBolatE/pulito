from rest_framework import generics, permissions, serializers
from rest_framework.response import Response

from knox.models import AuthToken
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer

class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token":token
        })

class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        print(user)
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token":token
        })
