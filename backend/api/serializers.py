from rest_framework import serializers
from .models import (
    Empresa,
    Cliente,
    ItemCatalogo,
    LancamentoFinanceiro,
    Lembrete,
    Orcamento,
    OrdemServico,
)


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = "__all__"


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = "__all__"


class ItemCatalogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCatalogo
        fields = "__all__"


class LancamentoFinanceiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = LancamentoFinanceiro
        fields = "__all__"


class LembreteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lembrete
        fields = "__all__"


class OrcamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orcamento
        fields = "__all__"


class OrdemServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdemServico
        fields = "__all__"
