# DssUploader

Componente composto de upload do Design System Sansys. Orquestra seleção,
visualização e envio de arquivos com identidade visual DSS completa.

## Instalação

```js
import { DssUploader } from '@dss/components'
```

## Uso Básico

```vue
<!-- Upload simples com URL -->
<DssUploader url="https://api.exemplo.com/upload" label="Anexar documentos" />

<!-- Upload múltiplo com validação -->
<DssUploader
  url="https://api.exemplo.com/upload"
  multiple
  accept=".pdf,.doc,.docx"
  :max-file-size="5242880"
  :max-files="10"
  @uploaded="onSuccess"
  @failed="onError"
/>

<!-- Upload automático com brand -->
<DssUploader
  url="https://api.exemplo.com/upload"
  auto-upload
  brand="hub"
/>

<!-- Com factory para configuração dinâmica -->
<DssUploader :factory="uploadFactory" />
```

## Variantes

```vue
<DssUploader variant="elevated" />  <!-- Padrão: com sombra -->
<DssUploader variant="outline" />   <!-- Apenas borda -->
<DssUploader variant="subtle" />    <!-- Fundo muted, borda mínima -->
```

## Brands

```vue
<DssUploader brand="hub"   />  <!-- Laranja Sansys Hub -->
<DssUploader brand="water" />  <!-- Azul Sansys Water -->
<DssUploader brand="waste" />  <!-- Verde Sansys Waste -->
```

## Estados

```vue
<DssUploader disable  />  <!-- Desabilitado -->
<DssUploader readonly />  <!-- Somente leitura -->
```

## Controle Programático

```vue
<DssUploader ref="uploaderRef" url="..." />

<script setup>
const uploaderRef = ref()
uploaderRef.value.upload()     // Inicia upload
uploaderRef.value.abort()      // Cancela upload
uploaderRef.value.reset()      // Limpa fila
uploaderRef.value.pickFiles()  // Abre seletor de arquivos
</script>
```

## Links

- [Documentação completa](./DssUploader.md)
- [API Reference](./DSSUPLOADER_API.md)
- [Exemplos interativos](./DssUploader.example.vue)
