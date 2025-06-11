<script setup>
import { defineExpose, onMounted, ref } from 'vue'

const props = defineProps({
  fecha: String,
  origen: String,
  destino: String,
  ruta: String,
  horaComienzo: String,
  horaTerminacion: String,
  duracionViaje: String,
  conductor: String,
  odometroInicial: String,
  odometroFinal: String,
  kilometrosRecorridos: String,
})

const { $fabric } = useNuxtApp()
const canvasContainer = ref(null)
let canvas

defineExpose({
  exportJSON: () => canvas.toJSON(),
  importJSON: json => canvas.loadFromJSON(json, canvas.renderAll.bind(canvas)),
  getCanvas: () => canvas,
})

function drawText(label, value, top, left) {
  const labelText = new $fabric.Text(`${label}: ${value || ''}`, {
    left,
    top,
    fontSize: 16,
    selectable: true,
    evented: true,
    hasControls: true, // puedes poner false si no quieres que lo escalen
    lockScalingFlip: true,
  })
  canvas.add(labelText)
}

onMounted(() => {
  canvas = new $fabric.Canvas(document.createElement('canvas'), {
    backgroundColor: 'white',
    width: 1122, // A4 horizontal at 96 DPI
    height: 793,
    selection: true,
  })

  canvasContainer.value.appendChild(canvas.getElement())

  const marginX = 40
  const top = 30

  // Logo (espacio)
  const logoRect = new $fabric.Rect({
    left: marginX,
    top,
    width: 120,
    height: 60,
    fill: 'white',
    stroke: 'black',
    selectable: true,
  })
  canvas.add(logoRect)
  drawText('MITRANS', '', top + 20, marginX + 10)

  // Columna 1
  drawText('Fecha', props.fecha, top, marginX + 160)
  drawText('Origen', props.origen, top + 40, marginX + 160)
  drawText('Destino', props.destino, top + 80, marginX + 160)
  drawText('Ruta', props.ruta, top + 120, marginX + 160)

  // Columna 2
  drawText('Hora de Comienzo', props.horaComienzo, top, 600)
  drawText('Hora de Terminación', props.horaTerminacion, top + 40, 600)
  drawText('Duración del Viaje', props.duracionViaje, top + 80, 600)
  drawText('Conductor', props.conductor, top + 120, 600)

  // Línea firma conductor
  drawText('Firma Conductor', '_________________________', 640, marginX)
  drawText('Firma Subdirector', '_______________________', 640, 500)

  // Odómetro
  drawText('Odómetro Inicial', props.odometroInicial, 560, marginX)
  drawText('Odómetro Final', props.odometroFinal, 560, 400)
  drawText('Kilómetros Recorridos', props.kilometrosRecorridos, 560, 700)
})
</script>

<template>
  <div ref="canvasContainer" class="canvas-wrapper" />
</template>

<style scoped>
.canvas-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>
