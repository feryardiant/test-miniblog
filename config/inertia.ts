import User from '#models/user'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    auth: async ({ auth, inertia, session }) => {
      const authWeb: number | undefined = session.get('auth_web')
      let currentUser: User | null = null

      if (authWeb) {
        currentUser = await User.find(authWeb)
      }

      return inertia.always(() => auth.user || currentUser)
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'resources/inertia/ssr.ts',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
