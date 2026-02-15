from django.contrib import admin
from .models import (
    Empresa,
    Cliente,
    ItemCatalogo,
    LancamentoFinanceiro,
    Lembrete,
    Orcamento,
    OrdemServico,
)

admin.site.register(Empresa)
admin.site.register(Cliente)
admin.site.register(ItemCatalogo)
admin.site.register(LancamentoFinanceiro)
admin.site.register(Lembrete)
admin.site.register(Orcamento)
admin.site.register(OrdemServico)
