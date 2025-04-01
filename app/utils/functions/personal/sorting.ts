export function sortingRouteManager(
  sortingState: [{ id: string | undefined; desc: boolean | undefined }]
) {
  const router = useRouter();
  const query = {
    sorting: sortingState[0].id,
    order: sortingState[0].desc ? "desc" : "asc",
  };

  router.push({
    query: query,
  });
  console.log(query);
  return query;
}
