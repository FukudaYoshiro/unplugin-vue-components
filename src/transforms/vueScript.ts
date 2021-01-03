import Debug from 'debug'
import { Transformer } from '../types'
import { Context } from '../context'
import { DISABLE_COMMENT, RESOLVER_EXT } from '../constants'

const debug = Debug('vite-plugin-components:transform:script')

/**
 * This transfomer inject a resolver to the script in a SFC.
 * The resolver is generated in `generator/resolver.ts`
 *
 * @param ctx
 */
export function VueScriptTransformer(ctx: Context): Transformer {
  return (code, id, path, query) => {
    if (!path.endsWith('.vue') || query.type)
      return code
    if (code.includes(DISABLE_COMMENT))
      return code

    const filepath = ctx.normalizePath(path)
    debug(filepath)

    const lines = code.trim().split('\n')

    const entry = '_sfc_main'

    if (!code.includes(`export default ${entry}`))
      return code

    // import a component resolver which is generated by the plugin
    lines.push(
      `import __components from "/${filepath}${RESOLVER_EXT}"`,
      `${entry}.components = __components(${entry}.components)`,
    )

    return lines.join('\n')
  }
}
