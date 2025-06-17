// import { h } from 'vue'
// import ConfirmDialog from '~/components/ConfirmDialog.vue'

// export function useConfirmDialog() {
//   const overlay = useOverlay()

//   function confirm(description: string): Promise<boolean> {
//     return new Promise((resolve) => {
//       const close = overlay.open(() =>
//         h(ConfirmDialog, {
//           description,
//           onConfirm: () => {
//             resolve(true)
//             close()
//           },
//           onCancel: () => {
//             resolve(false)
//             close()
//           },
//         }),
//       )
//     })
//   }

//   return { confirm }
// }
