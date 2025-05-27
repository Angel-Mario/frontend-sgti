export function sortingRouteManager(sortingState: { id: string, desc: boolean | undefined }) {
  const router = useRouter()
  const query = Object.assign({}, router.currentRoute.value.query)

  query.sorting = sortingState.id
  query.order = sortingState.desc ? 'desc' : 'asc'

  router.push({
    query,
  })
  return query
}
