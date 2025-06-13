/// <reference lib="DOM" />

interface ImportMetaEnv {
  VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
