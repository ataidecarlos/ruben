# Briefing técnico para transformação da página em WebApp / App Mobile

## Objetivo

Transformar o formulário HTML atual numa solução profissional, servida por backend, com persistência centralizada, pesquisa por identificador e suporte a web e mobile.

O objetivo é poder pedir orçamento para:
- **WebApp**
- **App mobile iOS/Android**

---

## Contexto atual

Existe uma página HTML única que já contém:
- formulário de visita/checklist;
- estados por item: OK / NOK / NA;
- observações e ações corretivas;
- fotografias;
- resumo e relatório;
- armazenamento local no browser.

A nova solução deve manter esta lógica funcional, mas com arquitetura robusta, multiutilizador e armazenamento central.

---

## Funcionalidades desejadas

### 1. Gestão de formulários
- Criar novo formulário de visita.
- Editar formulário em curso.
- Guardar automaticamente.
- Consultar formulário existente por **ID único**.
- Pesquisar formulários por:
  - ID;
  - técnico criador;
  - lote;
  - data;
  - estado.

### 2. Identificação do formulário
- ID único gerado automaticamente.
- Data e hora.
- Lote.
- Entidade executante.
- Técnico criador / emissor.
- Estado do formulário: rascunho, fechado, arquivado.

### 3. Checklist e riscos
- Manter a checklist atual.
- Estados por item:
  - OK
  - NOK
  - NA
- Permitir **múltiplas categorias de risco por NOK**.
- Permitir observações, responsável, prazo e marcação crítica.
- Permitir ocorrências adicionais no mesmo item.
- Regras automáticas para situações críticas.

### 4. Fotografias
- Captura pela câmara.
- Upload da galeria.
- Associação das fotos ao item e à ocorrência.
- Armazenamento das imagens em cloud:
  - AWS S3, Azure Blob Storage ou equivalente.
- Guardar na BD apenas os metadados e referências das imagens.

### 5. Relatórios
- Gerar relatório PDF.
- Visualização do relatório no browser/app.
- Download/partilha.
- Exportação com:
  - resumo geral;
  - NOK/Críticos;
  - fotos relevantes;
  - observações finais.

### 6. Pesquisa e consulta
- Pesquisa sem depender de import/export JSON.
- Abrir qualquer formulário diretamente por ID.
- Listagem com filtros e ordenação.
- Histórico completo de visitas.

### 7. Administração
- Gestão de técnicos.
- Gestão de categorias de risco.
- Gestão de entidades executantes.
- Possibilidade de atualizar categorias sem mexer no código, via ficheiro/configuração.

---

## Requisitos técnicos esperados

### Backend
- API REST ou equivalente.
- Base de dados relacional.
- Autenticação e autorização.
- Auditoria de alterações.
- Validação de dados no servidor.

### Storage
- Estrutura de armazenamento para:
  - imagens;
  - anexos;
  - eventualmente backups/exports.
- Cloud storage com URLs assinadas ou mecanismo equivalente.

### Mobile
- Interface responsiva.
- Suporte de câmara e upload de fotos.
- Possibilidade de modo offline/sincronização posterior.

---


## Entregáveis esperados

O orçamento deverá considerar:
- análise técnica;
- implementação da webapp;
- API/backend;
- base de dados;
- upload de fotos para cloud;
- geração de PDF;
- pesquisa por ID e técnico;
- documentação mínima de uso e deploy.

---

## Prioridade de implementação

### Fase 1
- WebApp funcional.
- Backend + BD.
- CRUD de formulários.
- Pesquisa por ID.
- Upload de imagens.

### Fase 2
- Relatórios PDF.
- Pesquisa avançada.
- Gestão de técnicos e categorias.

### Fase 3
- PWA ou app mobile.
- Offline/sincronização.
- Melhorias de UX e performance.

---

## Nota para orçamento

A solução atual já valida o fluxo funcional. O trabalho pedido agora é transformar essa lógica numa aplicação séria, com dados centralizados, pesquisa simples e escalabilidade para uso em obra.

