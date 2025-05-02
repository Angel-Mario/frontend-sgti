<template>
	<section class="w-full lg:w-2/3">
		<h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Accesos Rápidos</h2>
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			<HomeQuickLinkCard
				to="/personal/usuarios"
				title="Personal"
				description="Gestiona el personal del sistema"
				compact
			>
				<UIcon
					name="i-lucide-book-open"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/reportes"
				title="Reportes"
				description="Gestión de reportes"
				compact
			>
				<UIcon
					name="i-lucide-scroll-text"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/geografico/rutas"
				title="Rutas"
				description="Gestión de rutas"
				compact
			>
				<UIcon
					name="i-lucide-route"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/servicios/horario"
				title="Horario"
				description="Tabla de horario"
				compact
			>
				<UIcon
					name="i-lucide-calendar-cog"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/servicios/refuerzos"
				title="Refuerzos"
				description="Tabla de horario"
				compact
			>
				<UIcon
					name="i-lucide-trending-up"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/vehicular/combustibles"
				title="Combustibles asignados"
				description="Gestión de combustibles"
				compact
			>
				<UIcon
					name="i-lucide-chart-candlestick"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/vehicular/hojas-de-ruta"
				title="Hojas de ruta"
				description="Lista de hojas de rutas"
				compact
			>
				<UIcon
					name="i-lucide-file-text"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/vehicular/vehiculos"
				title="Vehículos"
				description="Gestión de vehículos"
				compact
			>
				<UIcon
					name="i-lucide-bus"
					class="size-14"
				/>
			</HomeQuickLinkCard>

			<HomeQuickLinkCard
				to="/vehicular/solicitudes-de-piezas"
				title="Solicitudes de Piezas"
				description="Lista de solicitudes de piezas"
				compact
			>
				<UIcon
					name="i-lucide-cog"
					class="size-14"
				/>
			</HomeQuickLinkCard>
		</div>
	</section>
</template>

<script lang="ts" setup>

</script>

<style></style>