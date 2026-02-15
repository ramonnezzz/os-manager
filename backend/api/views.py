from rest_framework import viewsets
from .models import (
    Empresa,
    Cliente,
    ItemCatalogo,
    LancamentoFinanceiro,
    Lembrete,
    Orcamento,
    OrdemServico,
)
from .serializers import (
    EmpresaSerializer,
    ClienteSerializer,
    ItemCatalogoSerializer,
    LancamentoFinanceiroSerializer,
    LembreteSerializer,
    OrcamentoSerializer,
    OrdemServicoSerializer,
)


class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class ItemCatalogoViewSet(viewsets.ModelViewSet):
    queryset = ItemCatalogo.objects.all()
    serializer_class = ItemCatalogoSerializer


class LancamentoFinanceiroViewSet(viewsets.ModelViewSet):
    queryset = LancamentoFinanceiro.objects.all()
    serializer_class = LancamentoFinanceiroSerializer


class LembreteViewSet(viewsets.ModelViewSet):
    queryset = Lembrete.objects.all()
    serializer_class = LembreteSerializer


class OrcamentoViewSet(viewsets.ModelViewSet):
    queryset = Orcamento.objects.all()
    serializer_class = OrcamentoSerializer


class OrdemServicoViewSet(viewsets.ModelViewSet):
    queryset = OrdemServico.objects.all()
    serializer_class = OrdemServicoSerializer
