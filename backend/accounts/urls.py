from django.urls import path, include
from .views import OrderWithUserCreate,RegisterWithSms,VerifySms,LoginWithSms,SearchUserView
from rest_framework import routers



urlpatterns = [
    path('auth-sms/register/', RegisterWithSms.as_view()),
    path('auth-sms/login/', LoginWithSms.as_view()),
    path('auth-sms/verify/',VerifySms.as_view()),
    path('order-with-user/', OrderWithUserCreate.as_view()),
    path('search-user/',SearchUserView.as_view())
]

