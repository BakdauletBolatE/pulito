from rest_framework import serializers,permissions
from .models import Order, Status, ShoesType,Shoes,OrderRate,OrderRateImages
from accounts.serializers import UserSerializer


class StatusSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('__all__')


class ShoesTypeSerilizer(serializers.ModelSerializer):
    class Meta:
        model = ShoesType
        fields = ('__all__')

class ShoesSerilizer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Shoes
        fields = ('id', 'mark', 'name', 'orderPrice','order','isDefect','unicId')



class OrderRateImagesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = OrderRateImages
        fields = ('id', 'image', 'order_rate')


class OrderRateSerilizer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    order_rate_images = OrderRateImagesSerializer(many=True,partial=True,required=False)

    class Meta:
        model = OrderRate
        fields = ('id', 'title', 'description','rate','owner','order','created_at','order_rate_images')

class OrderSerializer(serializers.ModelSerializer):

    shoes_name = ShoesSerilizer(many=True,partial=True)
    order_rates = OrderRateSerilizer(many=True,partial=True)
    owner = UserSerializer(partial=True)

    class Meta:
        model = Order
        fields = ('__all__')

    def create(self, validated_data):
        shoeses_data = validated_data.pop('shoes_name')
        order = Order.objects.create(**validated_data)
        for shoes_data in shoeses_data:
            Shoes.objects.create(order=order, **shoes_data)
        return order

    def update(self, instance, validated_data,partial=True):
       

        shoeses_data = validated_data.pop('shoes_name')
        shoeses = (instance.shoes_name).all()
        shoeses = list(shoeses)

        instance.exportationStatus = validated_data.get('exportationStatus', instance.exportationStatus)
        instance.cleanStatus = validated_data.get('cleanStatus', instance.cleanStatus)
        instance.owner_id = validated_data.get('owner_id', instance.owner_id)
        instance.statusDelivery = validated_data.get('statusDelivery', instance.statusDelivery)
        instance.delivery = validated_data.get('delivery', instance.delivery)
        instance.save()

       
        for shoes_data in shoeses_data:
            item_id = shoes_data.get('id', None)
            if item_id:
                inv_item = Shoes.objects.get(id=item_id, order=instance)
                inv_item.mark = shoes_data.get('mark', inv_item.mark)
                inv_item.name = shoes_data.get('name', inv_item.name)
                inv_item.orderPrice = shoes_data.get('orderPrice', inv_item.orderPrice)
                inv_item.save()
            else:
                Shoes.objects.create(order=instance, **shoes_data)

        return instance



       