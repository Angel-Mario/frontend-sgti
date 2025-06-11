<script setup>
// import jsPDF from 'jspdf'

const routeCanvas = useTemplateRef('routeCanvas')

function exportToImage() {
  const canvas = routeCanvas.value?.$el.querySelector('canvas')
  if (canvas) {
    const link = document.createElement('a')
    link.download = 'hoja-de-ruta.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}

function exportToPDF() {
  const canvas = routeCanvas.value?.$el.querySelector('canvas')
  console.log(routeCanvas.value?.exportJSON())
  navigator.clipboard.writeText(routeCanvas.value?.exportJSON())

  // if (canvas) {
  //   const imgData = canvas.toDataURL('image/png')
  //   const pdf = new jsPDF({
  //     orientation: 'landscape',
  //     unit: 'pt',
  //     format: 'a4',
  //   })
  //   const width = pdf.internal.pageSize.getWidth()
  //   const height = pdf.internal.pageSize.getHeight()
  //   pdf.addImage(imgData, 'PNG', 0, 0, width, height)
  //   pdf.save('hoja-de-ruta.pdf')
  // }
}
</script>

<template>
  <div class="space-y-4 exporter-wrapper">
    <!-- Botones de exportación -->
    <div class="flex gap-4">
      <UButton icon="ic:baseline-picture-as-pdf" color="red" variant="solid" @click="exportToPDF">
        Exportar PDF
      </UButton>
      <UButton icon="ic:baseline-image" color="blue" variant="solid" @click="exportToImage">
        Exportar Imagen
      </UButton>
      <UButton icon="ic:baseline-image" color="blue" variant="solid" @click="exportToImage">
        Importar JSON Imagen
      </UButton>
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
  background-color: #fff;
}
</style>
