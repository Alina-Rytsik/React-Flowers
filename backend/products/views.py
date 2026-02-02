from rest_framework import viewsets, generics, permissions, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import User, Category, Product, Order, PaymentCard, Favorite 
from rest_framework.response import Response 
from rest_framework.decorators import action 
from django.shortcuts import get_object_or_404
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
    # Это базовый класс, он будет работать для всех методов
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Пользователь видит только свои заказы
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Привязываем заказ к текущему пользователю
        serializer.save(user=self.request.user)

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

class FavoriteViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    # Метод для получения списка ТОЛЬКО избранных товаров
    def list(self, request):
        favorites = Product.objects.filter(favorites__user=request.user)
        serializer = ProductSerializer(favorites, many=True, context={'request': request})
        return Response(serializer.data)
    # Метод для переключения сердечка (создать/удалить запись)
    @action(detail=True, methods=['post'])
    def toggle(self, request, pk=None):
        product = Product.objects.get(pk=pk)
        fav, created = Favorite.objects.get_or_create(user=request.user, product=product)
        if not created:
            fav.delete()
            return Response({'is_favorite': False})
        return Response({'is_favorite': True})