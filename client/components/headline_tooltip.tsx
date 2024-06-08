import { CustomFlowbiteTheme, Tooltip } from "flowbite-react";

const tooltipTheme: CustomFlowbiteTheme["tooltip"] =
{
  "target": "w-fit",
  "animation": "transition-opacity",
  "arrow": {
    "base": "absolute z-50 h-2 w-2 rotate-45",
    "style": {
      "dark": "bg-gray-900 dark:bg-gray-700",
      "light": "bg-white",
      "auto": "bg-white dark:bg-gray-700"
    },
    "placement": "-4px"
  },
  "base": "absolute z-50 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm cursor-default",
  "hidden": "invisible opacity-0",
  "style": {
    "dark": "bg-gray-900 text-white dark:bg-gray-700",
    "light": "border border-gray-200 bg-white text-gray-900",
    "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
  },
  "content": "relative z-50 max-w-xl"
}

export default function HeadlineTooltip({children, content}: Readonly<{children: React.ReactNode; content: React.ReactNode;}>) 
{
  return (
    <Tooltip content={content} style="light" animation="duration-150" theme={tooltipTheme}>
      {children}
    </Tooltip>
  )
}