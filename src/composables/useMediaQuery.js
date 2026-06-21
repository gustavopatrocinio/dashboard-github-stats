import { onMounted, onUnmounted, ref } from 'vue'

export function useMediaQuery(query) {
  const matches = ref(false)

  let mediaQueryList = null

  function update() {
    matches.value = mediaQueryList?.matches ?? false
  }

  onMounted(() => {
    if (typeof window.matchMedia !== 'function') return

    mediaQueryList = window.matchMedia(query)
    update()
    mediaQueryList.addEventListener('change', update)
  })

  onUnmounted(() => {
    mediaQueryList?.removeEventListener('change', update)
  })

  return matches
}
