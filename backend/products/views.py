from rest_framework import viewsets, generics, permissions
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import User, Category, Product, Order, PaymentCard
from .serializers import (
    UserSerializer, RegisterSerializer, ProductSerializer, 
    CategorySerializer, OrderSerializer, CardSerializer
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

class ProfileView(generics.RetrieveUpdateDestroyAPIView): # Разрешит GET, PUT, PATCH и DELETE:
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # Доступ только для авторизованных

    def get_object(self):
        # Этот метод говорит Django: "Вместо поиска ID в URL, просто отдай того, кто сейчас авторизован"
        return self.request.user
    
class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PaymentCard.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Логика: если это первая карта, делаем её основной
        is_first = not PaymentCard.objects.filter(user=self.request.user).exists()
        serializer.save(user=self.request.user, is_primary=is_first)