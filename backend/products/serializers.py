from rest_framework import serializers
from .models import User, Category, Product, Order, OrderItem, PaymentCard, Favorite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone', 'gender', 'is_admin')

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.first_name')
    user_avatar = serializers.SerializerMethodField()  # Если есть аватар у юзера
    class Meta:
        model = User
        fields = ('id', 'username', 'user_avatar' 'email', 'password', 'rating', 'text', 'created_at')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    def get_user_avatar(self, obj):
        # Пример заглушки, если в модели User нет аватара
        return "/img/avatar-placeholder.png"

class ProductSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='name')
    imageUrl = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'imageUrl', 'category', 'is_favorite']
    def get_imageUrl(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, product=obj).exists()
        return False

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_image = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'product_name', 'product_image']
     # Метод для формирования полной ссылки на картинку
    def get_product_image(self, obj):
        if obj.product.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.product.image.url)
            return obj.product.image.url
        return None
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) 
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'customer_name', 'customer_phone', 'total_price', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        validated_data['user'] = self.context['request'].user
        
        order = Order.objects.create(**validated_data)

        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order
    

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentCard
        fields = ['id', 'brand', 'last4', 'is_primary']