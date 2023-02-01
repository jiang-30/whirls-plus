import type { PropType, ExtractPropTypes } from "vue";
import type Section from './section.vue'

export const sectionProps = {

}

export const sectionEmits = {

}

export type SectionProps = ExtractPropTypes<typeof sectionProps>

export type SectionEmits = typeof sectionEmits

export type SectionInstance = InstanceType<typeof Section>
