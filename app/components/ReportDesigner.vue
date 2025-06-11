<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

const { $fabric } = useNuxtApp()

onMounted(() => {
  if (!canvasRef.value || !$fabric)
    return

  const canvas = new $fabric.Canvas(canvasRef.value)

  // Estilos generales
  const labelStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    fill: '#000',
  }

  const inputStyle = {
    fill: '#fff',
    stroke: '#000',
    strokeWidth: 1,
    width: 120,
    height: 25,
  }

  // Título
  canvas.add(new $fabric.Text('Hoja de Ruta de vehículos', {
    ...labelStyle,
    left: 400,
    top: 10,
  }))

  // Fecha
  canvas.add(new $fabric.Text('Fecha', { ...labelStyle, left: 140, top: 60 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 190, top: 55 }))
  canvas.add(new $fabric.Textbox('', { ...labelStyle, left: 195, top: 57, width: 100, fontSize: 12 }))

  // Origen, Destino, Ruta
  canvas.add(new $fabric.Text('Origen', { ...labelStyle, left: 400, top: 60 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 460, top: 55 }))
  canvas.add(new $fabric.Text('Destino', { ...labelStyle, left: 400, top: 90 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 460, top: 85 }))
  canvas.add(new $fabric.Text('Ruta', { ...labelStyle, left: 400, top: 120 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 460, top: 115 }))

  // Horas
  canvas.add(new $fabric.Text('Hora de Comienzo', { ...labelStyle, left: 600, top: 60 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 730, top: 55 }))
  canvas.add(new $fabric.Text('Hora de Terminación', { ...labelStyle, left: 600, top: 90 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 730, top: 85 }))
  canvas.add(new $fabric.Text('Duración del Viaje', { ...labelStyle, left: 600, top: 120 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 730, top: 115 }))

  // Botón "Asignar Conductor"
  canvas.add(new $fabric.Rect({
    fill: '#ddd',
    stroke: '#000',
    left: 130,
    top: 90,
    width: 130,
    height: 30,
  }))
  canvas.add(new $fabric.Text('Asignar Conductor', {
    left: 135,
    top: 95,
    fontSize: 12,
  }))

  // Campo Nombre de Conductor
  canvas.add(new $fabric.Text('Nombre de Conductor', { ...labelStyle, left: 130, top: 130 }))

  // Lista de Pasajeros (grande)
  canvas.add(new $fabric.Text('Lista de Pasajeros', { ...labelStyle, left: 30, top: 160 }))
  canvas.add(new $fabric.Rect({
    fill: '#fff',
    stroke: '#000',
    left: 30,
    top: 180,
    width: 930,
    height: 200,
  }))

  // Firmas
  canvas.add(new $fabric.Text('Firma Conductor', { ...labelStyle, left: 30, top: 400 }))
  canvas.add(new $fabric.Line([150, 420, 300, 420], {
    stroke: '#000',
  }))
  canvas.add(new $fabric.Text('Firma Subdirector', { ...labelStyle, left: 30, top: 440 }))
  canvas.add(new $fabric.Line([170, 460, 320, 460], {
    stroke: '#000',
  }))

  // Kilometraje
  canvas.add(new $fabric.Text('Kilometraje (Si aplica Odómetro)', { ...labelStyle, left: 700, top: 400 }))
  canvas.add(new $fabric.Text('Odómetro Inicial', { ...labelStyle, left: 700, top: 430 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 840, top: 425 }))
  canvas.add(new $fabric.Text('Odómetro Final', { ...labelStyle, left: 700, top: 460 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 840, top: 455 }))
  canvas.add(new $fabric.Text('Kilómetros Recorridos', { ...labelStyle, left: 700, top: 490 }))
  canvas.add(new $fabric.Rect({ ...inputStyle, left: 840, top: 485 }))

  // Botones
  const btns = ['Aceptar', 'Imprimir', 'Cancelar']
  btns.forEach((text, i) => {
    const left = 100 + i * 120
    canvas.add(new $fabric.Rect({
      fill: '#eee',
      stroke: '#000',
      left,
      top: 530,
      width: 100,
      height: 30,
    }))
    canvas.add(new $fabric.Text(text, {
      left: left + 20,
      top: 537,
      fontSize: 14,
    }))
  })

  // Logo (opcional)
  canvas.add(new $fabric.Text('MITRANS', {
    left: 40,
    top: 20,
    fontSize: 20,
    fontWeight: 'bold',
  }))
})
</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvasRef" :width="800" :height="600" />
  </div>
</template>

<style scoped>
.canvas-container {
  border: 1px solid #ccc;
  display: inline-block;
  margin: 20px;
}
</style>
