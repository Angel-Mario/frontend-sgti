<script setup lang="ts">
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
const canvasEl = ref(null)
// const width = 1122
// const height = 793

const width = 793
const height = 1122 / 2

let canvas: { toJSON: () => any, loadFromJSON: (arg0: any, arg1: any) => any, renderAll: { bind: (arg0: any) => any }, add: (arg0: any) => void }

defineExpose({
  exportJSON: () => canvas.toJSON(),
  importJSON: (json: any) => canvas.loadFromJSON(json, canvas.renderAll.bind(canvas)),
  getCanvas: () => canvas,
})

function drawText(label: string, value = '', top: number, left: number, fontSize = 16) {
  const labelText = new $fabric.Text(`${label} ${value || ''}`, {
    left,
    top,
    fontSize,
    selectable: true,
    evented: true,
    hasControls: true, // puedes poner false si no quieres que lo escalen
    lockScalingFlip: true,
    editable: true,
  })
  canvas.add(labelText)
}

onMounted(() => {
  canvas = new $fabric.Canvas(canvasEl.value, {
    backgroundColor: 'white',
    selection: true,
  })

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
  drawText('MITRANS', '', top + 20, marginX + 10, 22)

  // Columna 1
  drawText('Conductor:', props.conductor, top + 20, marginX + 160)
  drawText('Origen:', props.origen, top + 70, marginX + 160)
  drawText('Destino:', props.destino, top + 120, marginX + 160)
  drawText('Ruta:', props.ruta, top + 170, marginX + 160)

  // Tiempo
  drawText('Fecha:', props.fecha, top + 20, 520)
  drawText('Hora de Comienzo    :', props.horaComienzo, top + 70, 520)
  drawText('Hora de Terminación:', props.horaTerminacion, top + 120, 520)
  drawText('Duración del Viaje   :', props.duracionViaje, top + 170, 520)

  // Línea firma conductor
  drawText('Firma Conductor  :', '_______________________', 440, marginX)
  drawText('Firma Subdirector:', '_______________________', 490, marginX)

  // Odómetro
  drawText('Odómetro Inicial          :', props.odometroInicial, 390, 520)
  drawText('Odómetro Final            :', props.odometroFinal, 440, 520)
  drawText('Kilómetros Recorridos:', props.kilometrosRecorridos, 490, 520)
})
</script>

<template>
  <canvas id="canvas" ref="canvasEl" :width="width" :height="height" />
</template>

<style scoped>
.canvas-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>
