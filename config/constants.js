const devMode = process.env.NODE_ENV || 'development'
const isDevMode = devMode === 'development'

export { devMode, isDevMode }