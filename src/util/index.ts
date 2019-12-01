function getConfig(key: string): string | undefined {
  return process.env[key.toUpperCase()]
}

export { getConfig, getConfig as default }
