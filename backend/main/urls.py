from rest_framework import routers
from .views import OrderViewSet, ListOrdersByStatus, OrderUserViewSet,UserUpdateView,OrderRateViewSet
from django.urls import path,include

router = routers.DefaultRouter()
router.register('orders', OrderViewSet, 'orders')
router.register('orders-user', OrderUserViewSet, 'order-user')
router.register('orders-rate',OrderRateViewSet, 'orders-rate')

urlpatterns = [
    path('', include('accounts.urls')),
    path('user-update/<str:number_phone>/',UserUpdateView.as_view()),
    path('order-by-status/<int:pk>/', ListOrdersByStatus.as_view())
]

urlpatterns += router.urls