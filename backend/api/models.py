import uuid
from django.db import models


class Empresa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nomeFantasia = models.CharField(max_length=255)
    razaoSocial = models.CharField(max_length=255, blank=True, null=True)
    tipoPessoa = models.CharField(
        max_length=2, choices=(("PF", "Pessoa Física"), ("PJ", "Pessoa Jurídica"))
    )
    cpfCnpj = models.CharField(max_length=64)
    telefone = models.CharField(max_length=64, blank=True)
    email = models.EmailField(blank=True)
    endereco = models.TextField(blank=True)
    bairro = models.CharField(max_length=255, blank=True)
    cidade = models.CharField(max_length=255, blank=True)
    uf = models.CharField(max_length=8, blank=True)
    cep = models.CharField(max_length=32, blank=True)
    logoUrl = models.URLField(blank=True)
    chavePix = models.CharField(max_length=128, blank=True)
    observacoesPadraoDoc = models.TextField(blank=True)

    def __str__(self):
        return self.nomeFantasia


class Cliente(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    empresa = models.ForeignKey(
        Empresa,
        on_delete=models.CASCADE,
        related_name="clientes",
        null=True,
        blank=True,
    )
    nome = models.CharField(max_length=255)
    tipoPessoa = models.CharField(
        max_length=2, choices=(("PF", "Pessoa Física"), ("PJ", "Pessoa Jurídica"))
    )
    cpfCnpj = models.CharField(max_length=64, blank=True, null=True)
    telefone = models.CharField(max_length=64, blank=True)
    email = models.EmailField(blank=True)
    endereco = models.TextField(blank=True)
    bairro = models.CharField(max_length=255, blank=True)
    cidade = models.CharField(max_length=255, blank=True)
    uf = models.CharField(max_length=8, blank=True)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return self.nome


class ItemCatalogo(models.Model):
    TIPO_CHOICES = (("produto", "Produto"), ("servico", "Serviço"))
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tipo = models.CharField(max_length=16, choices=TIPO_CHOICES)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True)
    precoBase = models.DecimalField(max_digits=12, decimal_places=2)
    unidade = models.CharField(max_length=64)
    codigoBarras = models.CharField(max_length=128, blank=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.nome


class LancamentoFinanceiro(models.Model):
    TIPO_CHOICES = (("receita", "Receita"), ("despesa", "Despesa"))
    ORIGEM_CHOICES = (("OS", "OS"), ("Orcamento", "Orçamento"), ("Manual", "Manual"))
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tipo = models.CharField(max_length=8, choices=TIPO_CHOICES)
    origemTipo = models.CharField(max_length=16, choices=ORIGEM_CHOICES)
    origemId = models.CharField(max_length=128, blank=True, null=True)
    dataCompetencia = models.DateField()
    dataVencimento = models.DateField(blank=True, null=True)
    dataPagamento = models.DateField(blank=True, null=True)
    valor = models.DecimalField(max_digits=14, decimal_places=2)
    formaPagamento = models.CharField(max_length=64, blank=True)
    categoria = models.CharField(max_length=128, blank=True)
    descricao = models.TextField(blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.valor}"


class Lembrete(models.Model):
    TIPO_CHOICES = (
        ("Visita", "Visita"),
        ("Retorno cliente", "Retorno cliente"),
        ("Cobrança", "Cobrança"),
        ("Entrega", "Entrega"),
        ("Outro", "Outro"),
    )
    STATUS_CHOICES = (("Pendente", "Pendente"), ("Concluído", "Concluído"))
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dataHora = models.DateTimeField()
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True)
    tipo = models.CharField(max_length=32, choices=TIPO_CHOICES)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES)
    cliente = models.ForeignKey(
        Cliente, on_delete=models.SET_NULL, null=True, blank=True
    )
    os = models.ForeignKey(
        "OrdemServico", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return self.titulo


class Orcamento(models.Model):
    STATUS_CHOICES = (
        ("Emitido", "Emitido"),
        ("Aprovado", "Aprovado"),
        ("Rejeitado", "Rejeitado"),
        ("ConvertidoEmOS", "ConvertidoEmOS"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero = models.CharField(max_length=64)
    cliente = models.ForeignKey(
        Cliente, on_delete=models.CASCADE, related_name="orcamentos"
    )
    dataEmissao = models.DateTimeField()
    validadeDias = models.IntegerField()
    status = models.CharField(max_length=32, choices=STATUS_CHOICES)
    observacoes = models.TextField(blank=True)
    total = models.DecimalField(max_digits=14, decimal_places=2)
    os = models.ForeignKey(
        "OrdemServico",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="orcamentos",
    )

    def __str__(self):
        return f"Orçamento {self.numero} - {self.cliente}"


class OrcamentoItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    orcamento = models.ForeignKey(
        Orcamento, on_delete=models.CASCADE, related_name="itens"
    )
    itemCatalogo = models.ForeignKey(
        ItemCatalogo, on_delete=models.SET_NULL, null=True, blank=True
    )
    descricao = models.TextField()
    quantidade = models.IntegerField()
    valorUnitario = models.DecimalField(max_digits=12, decimal_places=2)
    desconto = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=14, decimal_places=2)

    def __str__(self):
        return f"{self.descricao} ({self.quantidade})"


class OrdemServico(models.Model):
    STATUS_CHOICES = (
        ("Aberta", "Aberta"),
        ("Em andamento", "Em andamento"),
        ("Aguardando peça", "Aguardando peça"),
        ("Concluída", "Concluída"),
        ("Cancelada", "Cancelada"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero = models.CharField(max_length=64)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="os")
    dataAbertura = models.DateTimeField()
    status = models.CharField(max_length=32, choices=STATUS_CHOICES)
    equipamento = models.CharField(max_length=255)
    defeitoRelatado = models.TextField(blank=True)
    observacoesGerais = models.TextField(blank=True)
    laudoTecnico = models.TextField(blank=True)
    solucao = models.TextField(blank=True)
    valorMaoDeObra = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    valorProdutos = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    desconto = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=14, decimal_places=2, default=0)

    def __str__(self):
        return f"OS {self.numero} - {self.cliente}"


class OSItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ordemServico = models.ForeignKey(
        OrdemServico, on_delete=models.CASCADE, related_name="itens"
    )
    itemCatalogo = models.ForeignKey(
        ItemCatalogo, on_delete=models.SET_NULL, null=True, blank=True
    )
    descricao = models.TextField()
    quantidade = models.IntegerField()
    valorUnitario = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=14, decimal_places=2)

    def __str__(self):
        return f"{self.descricao} ({self.quantidade})"
