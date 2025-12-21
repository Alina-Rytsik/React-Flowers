from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, OrderViewSet, 
    RegisterView, CurrentUserView, AdminUserViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'admin-users', AdminUserViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('user/', CurrentUserView.as_view(), name='current_user'),
    path('', include(router.urls)),
]
