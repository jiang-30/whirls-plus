export function usePaginationAttrsFormatter(page: any, defaultConfig: any = {}): any {
  return {
    pageSizes: [10, 20, 50, 100],
    background: true,
    layout: ' ->, total, sizes, prev, pager, next, jumper',
  }
}
