import glob from 'fast-glob'
import { existsSync } from 'fs'
export async function loadFiles(dirName: string) {
  const botFolder = `${process.cwd().replace(/\\/g, '/')}/bot`
  let files: string[]
  if (existsSync(botFolder)) {
    files = await glob(
      `${process.cwd().replace(/\\/g, '/')}/bot/src/${dirName}/**/*.{js,ts}`
    )
  } else {
    files = await glob(
      `${process.cwd().replace(/\\/g, '/')}/src/${dirName}/**/*.{js,ts}`
    )
  }

  for (const file of files) {
    delete require.cache[require.resolve(file)]
  }
  return files
}

export async function loadInternalFiles(dirName: string) {
  const files = await glob(`${__dirname}/../../${dirName}/events/**/*.{js,ts}`)

  for (const file of files) {
    delete require.cache[require.resolve(file)]
  }

  return files
}
