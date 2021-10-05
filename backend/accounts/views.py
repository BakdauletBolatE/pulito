from accounts.models import UserAccount,AccountSmsVerification
from django.http.response import HttpResponse, JsonResponse
 
from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.filters import SearchFilter
from .serializers import UserSerializer,AccountSMSSerializer,TokenCreateWithPhoneSerializer
from django.contrib.auth import get_user_model
from main.serilizers import OrderSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend



User = get_user_model()



class LoginWithSms(APIView):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self,request,*args,**kwargs):
        serializer = AccountSMSSerializer
        try:
            user = User.objects.get(number_phone=request.data.get('number_phone'))
            user.save()
            return JsonResponse({"data": "success","code":200})
        except User.DoesNotExist:
            return JsonResponse({"data": "phone not found","code":400})
        


# Create your views here.
class RegisterWithSms(APIView):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self,request,*args,**kwargs):
        serializer = AccountSMSSerializer
        userData = {
            'name':request.data.get('name'),
            "number_phone": request.data.get('number_phone')
        }
        user = self.serializer_class.create(self,userData)  
        return JsonResponse({"data": "success","code":200})
        


class SearchUserView(generics.ListAPIView):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,SearchFilter)
    search_fields = ('number_phone', 'id','email')       
    permission_classes = [permissions.AllowAny]

        

class VerifySms(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    def createToken(self,user):
        return RefreshToken.for_user(user)

    def post(self,request,*args,**kwargs):
      
        number_phone = request.data.get('number_phone')
        try:    
            user = UserAccount.objects.get(number_phone=number_phone)
            dataToken = {}
            if request.data.get('code') == str(user.smscode.code):
                refresh = self.createToken(user)
                dataToken['refresh'] = str(refresh)
                dataToken['access'] = str(refresh.access_token)
                return JsonResponse(dataToken)
            else:
                return JsonResponse({"data":"invalid code"})
        except UserAccount.DoesNotExist:
            return JsonResponse({"data": "invalid number"})


        
           
        

        


class OrderWithUserCreate(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer
    serializer_class2 = OrderSerializer


    def post(self, request, *args, **kwargs):
        print(request.data)
        
        userData = {
            'number_phone': request.data.get('number_phone'),
            'name':request.data.get('name'),
            'email': request.data.get('email')
        }

        if request.data.get('number_phone') == '':
            return JsonResponse({"data": "Пожалуйста введите номер телефона" })
        if request.data.get('name') == '':
            return JsonResponse({"data": "Пожалуйста введите имя"})
        if request.data.get('email') == '':
            return JsonResponse({"data": "Пожалуйста введите email"})
        try:
            user = User.objects.get(number_phone=request.data.get('number_phone'))
            orderData={
                'owner_id':user.id,
                'totalPrice': request.data.get('totalPrice'),
                'delivery': request.data.get('delivery'),
                'shoes_name': request.data.get('shoes_name')
            }
         
        except:
            user = self.serializer_class.create(self,userData)
            orderData = {
                'owner_id':user.id,
                'delivery': request.data.get('delivery'),
                'totalPrice': request.data.get('totalPrice'),
                'shoes_name': request.data.get('shoes_name'),
            }
             
        
        data = self.serializer_class2.create(self,orderData)  
        print(data)

       
        return HttpResponse(data)