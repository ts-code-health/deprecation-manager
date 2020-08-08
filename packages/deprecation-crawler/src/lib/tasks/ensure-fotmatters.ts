import { EOL } from "os";
import { builtInFormatter } from "../output-formatters";
import { CRAWLER_CONFIG_PATH } from "../constants";
import { CrawlConfig, Deprecation } from "../models";

export function ensureFormatter(config: CrawlConfig): [string, (config: CrawlConfig,
  rawDeprecations: Deprecation[]
) => Promise<void>][] {
  if(config.outputFormatters.length <= 0) {
    throw new Error(`No formatter registered! ${EOL}
    builtInFormatter: ${Object.keys(builtInFormatter).join(', ')}${EOL}
    Add outputFormatters to ${CRAWLER_CONFIG_PATH}.`)
  }

  const configuredAndExistingFormatter = Object.entries(builtInFormatter)
    // Run only registered formatters
    .filter(([formatterKey, formatter]) => config.outputFormatters.includes(formatterKey))

  if(configuredAndExistingFormatter.length <= 0) {
    throw new Error(`No registered formatter available! ${EOL}
    registered formatter: ${Object.keys(config.outputFormatters).join(', ')}${EOL}
    Update outputFormatters to ${CRAWLER_CONFIG_PATH} with existing formatters.`)
  }

  return configuredAndExistingFormatter;

}