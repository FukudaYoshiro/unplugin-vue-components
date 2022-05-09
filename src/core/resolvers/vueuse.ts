import { readFileSync } from 'fs'
import { resolveModule } from 'local-pkg'
import type { ComponentResolver } from '../../types'

let components: string[] | undefined

/**
 * Resolver for VueUse
 *
 * @link https://github.com/vueuse/vueuse
 */
export function VueUseComponentsResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (!components) {
        try {
          const corePath = resolveModule('@vueuse/core') || process.cwd()
          const path = resolveModule('@vueuse/core/indexes.json')
            || resolveModule('@vueuse/metadata/index.json')
            || resolveModule('@vueuse/metadata/index.json', { paths: [corePath] })
          indexesJson = JSON.parse(readFileSync(path!, 'utf-8'))
          components = indexesJson
            .functions
            .filter((i: any) => i.component && i.name)
            .map(({ name }: any) => name[0].toUpperCase() + name.slice(1))
        }
        catch (error) {
          console.error(error)
          throw new Error('[vue-components] failed to load @vueuse/core, have you installed it?')
        }
      }

      if (components && components.includes(name))
        return { name, as: name, from: '@vueuse/components' }
    },
  }
}
