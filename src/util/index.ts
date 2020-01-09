function getConfig(key: string): string {
  return process.env[key.toUpperCase()] || ''
}

export { getConfig, getConfig as default }
