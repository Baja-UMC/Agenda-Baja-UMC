# Instruções de desenvolvimento — Agenda Baja UMC

Estas regras valem para qualquer pessoa ou agente que trabalhe neste repositório.

## Fonte oficial e publicação

- O repositório `Baja-UMC/Agenda-Baja-UMC` no GitHub é a fonte oficial da agenda.
- Produção no GitHub Pages só pode receber código integrado à branch `main`.
- Nunca publique uma branch de trabalho, um PR aberto ou uma versão com testes falhando.
- Publicar é uma ação separada: faça o deploy somente quando o usuário solicitar ou aprovar explicitamente.

## Issues e Pull Requests

1. Antes de toda correção, melhoria ou nova função, crie ou localize uma Issue.
2. Trabalhe em uma branch associada, como `fix/12-filtro-area` ou `feat/18-anotacoes`.
3. Abra um Pull Request para `main` e inclua `Closes #<numero>` na descrição.
4. Registre no PR o que mudou, como foi validado, riscos e migrations relacionadas no repositório principal.
5. Aguarde a CI passar antes do merge e prefira squash merge.

## Validação e segurança

- Execute `node --test tests/*.test.mjs` antes de considerar a mudança pronta.
- Alterações de tabelas, funções e permissões pertencem a migrations versionadas no repositório `Site-Baja-UMC`.
- Toda tabela acessada pelo navegador deve ter RLS e grants mínimos no Supabase.
- Não exponha senhas, tokens privados, dados pessoais ou a chave `service_role` no código, nos logs, nas Issues ou nos PRs.
- Preserve as permissões de proprietário, administrador, líder, membro e patrocinador.

## Interface

- Use as áreas cadastradas em `project_areas` como fonte oficial para filtros e formulários.
- Toda atribuição de pessoas deve aceitar mais de um responsável quando aplicável.
- Mantenha estados de carregamento, vazio e erro claros e preserve a usabilidade no celular.
- Movimento deve explicar estado ou progresso e respeitar preferências de redução de animação.
