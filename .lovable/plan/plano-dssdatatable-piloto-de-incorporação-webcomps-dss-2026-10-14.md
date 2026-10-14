# Plano: DssDataTable — piloto de incorporação WebComps → DSS

## Objetivo

Criar um novo composto `DssDataTable`, inspirado no `jtech-data-table`, mas com uma API Vue 3 limpa e governada pelo DSS. O piloto cobrirá o núcleo operacional: dados locais e remotos controlados, filtro, paginação, seleção, ações, expansão e estados de carregamento/vazio/erro.

A implementação legado será referência funcional, não fonte arquitetural. O novo componente comporá o `DssTable` e demais componentes DSS; não copiará Quasar cru, Stylus, mixins Vue 2, acesso a repositório global ou expressões dinâmicas.

## O que será construído

1. **Contrato funcional antes do código**
   - Registrar o pre-prompt Fase 3 com casos de uso, casos negativos, árvore de composição, estados e limites.
   - Definir o de-para legado → DSS e validar a composição disponível.

2. **Novo composto `DssDataTable`**
   - Estrutura DSS completa em quatro camadas, wrapper oficial, types, composables, documentação e contrato derivado.
   - API controlada com `rows`, `columns`, `rowKey`, `selection`, `modelValue`, `filter`, `pagination`, `loading`, `error`, `density` e `mode: local | remote`.
   - Paginação remota via evento `request`; nenhuma chamada de rede dentro do componente.
   - Ações de topo/lote e ações por linha configuradas por dados, renderizadas com `DssButton`/`DssActionMenu` e eventos explícitos.
   - Expansão de linha controlada, com slot tipado para detalhes e carregamento assíncrono solicitado por evento.
   - Estados completos: padrão, loading, vazio, filtro sem resultado, erro e seleção ativa.
   - Brand e tema herdados por `data-*`; sem props `dark`, `color` ou estilos hardcoded.

3. **Fora deste primeiro piloto**
   - Edição inline, upload/imagem automática, `expr-eval`, mutação interna de linhas, resolução por `nmInterface`, scroll infinito remoto e compatibilidade por aliases com a API Vue 2.
   - Esses pontos serão documentados como lacunas de migração, sem implementação implícita.

4. **Demonstração real no sandbox**
   - Criar uma página operacional, montando o SFC real, com seletor `SANDBOX · ESTADO`.
   - Cenários: local, remoto simulado, loading, vazio, erro, seleção múltipla, ações e expansão.
   - Controles de tema e marca ficarão na barra do sandbox, sem alterar o estado funcional.
   - Registrar o componente no Preview Frame/registry exigido pela governança, além da página operacional.

5. **Documentação e migração**
   - README, documento normativo, API completa e exemplos.
   - Matriz de migração `jtech-data-table` → `DssDataTable`, destacando equivalências, mudanças deliberadas e itens adiados.
   - Registrar a decisão arquitetural no `AGENTS.md`: dados remotos pertencem ao consumidor; o composto apenas emite solicitações e apresenta estado.

## Validação

- Testes unitários de renderização, API, seleção, paginação, ações, expansão, estados e acessibilidade.
- SCSS, TypeScript, higiene de SFC, paridade API/docs, contrato derivado e scans constitucionais.
- Gates do sandbox e regressão estática aplicável.
- Validação em Chromium do fluxo local e remoto simulado, em light/dark e Hub/Water/Waste, incluindo seleção, ações e expansão.
- Probe visual do SFC real no Preview Frame.

## Critério de conclusão

O piloto estará concluído quando o componente real estiver utilizável no sandbox, com contrato e documentação derivados, todos os gates aplicáveis verdes e limitações registradas. A certificação final por auditor independente e integrações reais dos produtos Sansys permanecerão fora desta entrega.
