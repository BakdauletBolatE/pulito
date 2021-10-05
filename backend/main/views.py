from django.http import request
from rest_framework import serializers, viewsets,permissions
from .serilizers import OrderSerializer,OrderRateSerilizer,OrderRateImagesSerializer
from .models import Order,OrderRate
from rest_framework.parsers import MultiPartParser,FormParser 
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer
from django.http.response import JsonResponse
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
import telebot
from rest_framework import status

User = get_user_model()
# Create your views here.

class OrderViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAdminUser
    # ]
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def createMessageFromRequest(self, data):
        if 'exportationStatus' in data:
            if data['exportationStatus'] == '0':
                return "Ваша заявка в очереде"
            if data['exportationStatus'] == '1':
                return "Мы идем за заказом"
            if data['exportationStatus'] == '2':
                return "Мы доставили ваш обувь до чистки"
        
        if 'cleanStatus' in data:
            if data['cleanStatus'] == '0':
                return "Ваша обувь в очереде на чистку"
            if data['cleanStatus'] == '1':
                return "Ваш обувь чиститься ураа"
            if data['cleanStatus'] == '2':
                return "Ваш обувь чиста как кристал можете забрать или мы доставим вам"

        if 'statusDelivery' in data:
            if data['statusDelivery'] == '0':
                return "Курьеры возмуться на ваш обувь когда освоводяться"
            if data['statusDelivery'] == '1':
                return "Ваш курьер в пути будте готовы"
            if data['statusDelivery'] == '2':
                return "Спасибо за чистку в Pulito мы рады всегда"
        
        
    def partial_update(self, request, *args, **kwargs):
        TOKEN = "1959812189:AAH_uOE9eEYoHZNLKKNIrwe20dZagkhLlug"
        bot = telebot.TeleBot(TOKEN, parse_mode=None)
        order = Order.objects.get(pk=kwargs.get('pk'))
        if order.owner.telegram_chat_id is not None:
            chat_id = order.owner.telegram_chat_id
            message = self.createMessageFromRequest(request.data)
            message = f"Заказ: {order.name} - {message}"
            if chat_id is not None:      
                bot.send_message(chat_id, message)

        print(order)
        return super().partial_update(request, *args, **kwargs)


class OrderRateViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    parser_classes = [MultiPartParser,FormParser]


    serializer_class = OrderRateSerilizer

    queryset = OrderRate.objects.all()

    filter_backends = (DjangoFilterBackend,SearchFilter)
    filter_fields = ('id','owner','order')   
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        id = serializer.data.get('id')
        images = request.FILES.getlist('order_rate_images')

        print(images)

        for image in images:
            data = {
                'image': image,
                'order_rate': id
            }
            orderRateImageSerializer = OrderRateImagesSerializer(data=data)
            if orderRateImageSerializer.is_valid():
                orderRateImageSerializer.save()
            else:
                print('Error')
     

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class OrderUserViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.request.user.orders.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    

    

class ListOrdersByStatus(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self): 
        return super().get_queryset().filter(status_id=self.kwargs['pk']).order_by('-created_at')

    def list(self, request, pk):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

class UserUpdateView(APIView):
    def get_object(self, number_phone):
        return User.objects.get(number_phone=number_phone)

    def patch(self, request, number_phone):
        testmodel_object = self.get_object(number_phone)
        serializer = UserSerializer(testmodel_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                "code": "201",
                "data": serializer.data,
            })
        return JsonResponse({
                "code": "400",
                "data": "wrong"
            })