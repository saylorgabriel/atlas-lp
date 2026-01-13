# ATLAS

**WhatsApp AI Copilot** — Inteligência contextual integrada ao WhatsApp.

---

## O que é o ATLAS?

ATLAS transforma suas conversas do WhatsApp em insights acionáveis. É um copiloto de IA que analisa, responde e monitora suas conversas em tempo real.

### Como usar

```
Atlas: resumo das últimas 50 mensagens
Atlas: o que João disse sobre o projeto?
Atlas: top 5 membros mais ativos hoje
```

Basta mencionar `Atlas:` seguido da sua pergunta em qualquer chat.

---

## Features

| Feature | Descrição |
|---------|-----------|
| **Chat Natural** | Converse naturalmente direto no WhatsApp |
| **Busca Híbrida** | BM25 + embeddings vetoriais em 23ms |
| **Insights Proativos** | Detecta padrões e sentimentos automaticamente |
| **Transcrição de Áudio** | Whisper via Groq (90% mais barato) |
| **Action Items** | Extrai tarefas mencionadas nas conversas |
| **Controle de Acesso** | Whitelist por contato e grupo |

---

## Performance

| Métrica | Valor |
|---------|-------|
| Tempo de busca | **23ms** |
| Economia em custos | **90%** |
| Taxa de precisão | **95%** |
| Cache hit rate | **85%** |

---

## Tech Stack

- **Runtime**: Bun.js + Elysia.js
- **Database**: PostgreSQL + pgvector
- **Search**: BM25 (FlexSearch) + Redis
- **AI**: LangChain.js + GPT-4o-mini
- **WhatsApp**: WUZAPI

---

## Links

- [Landing Page](https://saylorgabriel.github.io/atlas-lp/)
- [Repositório Principal](https://github.com/saylorgabriel/jarvisinwhats)

---

**Open Source** · Self-hosted · Seus dados, seu controle.
