<script setup lang="ts">
import { jsPDF } from 'jspdf'

const routeCanvas = useTemplateRef('routeCanvas')
const toast = useToast()

function exportToImage() {
  const canvas = routeCanvas.value?.$el
  console.log('Canvas encontrado', canvas)
  if (canvas) {
    const link = document.createElement('a')
    link.download = 'hoja-de-ruta.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}

function exportToPDF() {
  const canvas = routeCanvas.value?.$el

  if (canvas) {
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    })
    const width = pdf.internal.pageSize.getWidth()
    const height = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save('hoja-de-ruta.pdf')
  }
}

function exportToJSON() {
  navigator.clipboard.writeText(routeCanvas.value?.exportJSON())
  toast.add({
    title: 'La plantilla ha sido copiada al portapapeles',
    color: 'success',
    icon: 'i-lucide-circle-check',
  })
}

function printImage() {
  const canvas = routeCanvas.value?.$el
  if (canvas) {
    const imgData = canvas.toDataURL('image/png')
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Hoja de Ruta</title>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                text-align: center;
              }
              img {
                width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <img src="${imgData}" />
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }
}
</script>

<template>
  <div class="space-y-4 exporter-wrapper">
    <div class="flex gap-4">
      <UButton icon="i-lucide-printer" color="primary" variant="solid" @click="printImage">
        Imprimir Imagen
      </UButton>
      <UButton icon="ic:baseline-picture-as-pdf" color="error" variant="solid" @click="exportToPDF">
        Exportar PDF
      </UButton>
      <UButton icon="i-lucide-image" color="neutral" variant="solid" @click="exportToImage">
        Exportar Imagen
      </UButton>
      <UButton icon="i-lucide-braces" color="neutral" variant="solid" @click="exportToJSON">
        Exportar JSON Imagen
      </UButton>
      <!--
<UButton icon="ic:baseline-image" color="neutral" variant="solid" @click="exportToJSON">
        Importar JSON Imagen
      </UButton> -->
    </div>

    <!-- Canvas del reporte -->
    <VehicleRouteCanvas
      ref="routeCanvas"
      fecha="2025-06-10"
      origen="La Habana"
      destino="Matanzas"
      ruta="Ruta 1"
      hora-comienzo="08:00"
      hora-terminacion="10:30"
      duracion-viaje="2h 30min"
      conductor="Juan Pérez"
      odometro-inicial="12345"
      odometro-final="12450"
      kilometros-recorridos="105"
    />
  </div>
</template>

<style scoped>
.exporter-wrapper {
  padding: 20px;
  background-color:rgb(246, 246, 246);
	border-radius: 12px;
}
</style>
