# Migração: jtech-data-table → DssDataTable

| Legado | DSS | Observação |
|---|---|---|
| `fields` | `columns` | Contrato tipado do DssTable |
| `data` | `rows` | Somente leitura pelo componente |
| `singleselect/multiselect/noneselect` | `selection` | Enum único |
| `preSelectedKeys` | `modelValue` inicial | Consumidor resolve chaves |
| `apiMode/nmInterface/extraParams` | `mode="remote"` + `@request` | Rede fora do componente |
| `buttons` | `actions` | Payload explícito em `@action` |
| `rowButtons` | `rowActions` ou slot | Componentes DSS reais |
| `custom-expand-content` | `expanded-row` | `expandedKeys` controlado |
| `messageDataEmpty` | `noDataLabel` | Equivalente |
| `refresh()` | `request()` | Solicita nova leitura |
| `columnEdit/forms` | fora do piloto | Exige contrato futuro |
| virtual scroll remoto incremental | fora do piloto | Não equivale a virtualização local |
