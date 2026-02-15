from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    EmpresaViewSet,
    ClienteViewSet,
    ItemCatalogoViewSet,
    LancamentoFinanceiroViewSet,
    LembreteViewSet,
    OrcamentoViewSet,
    OrdemServicoViewSet,
)

router = DefaultRouter()
router.register(r"empresas", EmpresaViewSet)
router.register(r"clientes", ClienteViewSet)
router.register(r"itens", ItemCatalogoViewSet)
router.register(r"lancamentos", LancamentoFinanceiroViewSet)
router.register(r"lembretes", LembreteViewSet)
router.register(r"orcamentos", OrcamentoViewSet)
router.register(r"os", OrdemServicoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
