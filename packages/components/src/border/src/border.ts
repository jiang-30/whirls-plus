import type Border from './border.vue'
import type { ExtractPropTypes } from 'vue'

export const borderProps = {
  type: {
    type: String
  }
}

export type BorderProps = ExtractPropTypes<typeof borderProps>

export type BorderInstance = InstanceType<typeof Border>
