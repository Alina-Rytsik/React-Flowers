from rest_framework import viewsets, generics, permissions
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import User, Category, Product, Order
from .serializers import (
    UserSerializer, RegisterSerializer, ProductSerializer, 
    CategorySerializer, OrderSerializer
)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    def get_permissions(self):
        return [AllowAny()] if self.action == 'create' else [IsAdminUser()]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]