"use strict";Object.defineProperty(exports,"__esModule",{value:!0});function filterChildren({children,filterBy,componentName}){if(Array.isArray(children)?children.filter(child=>typeof child.type=="string").length>0:typeof children?.type=="string")throw new Error(`Only library components are allowed into <${componentName}/>`);return Array.isArray(children)?children.filter(child=>filterBy.includes(child.type.displayName)):children}exports.default=filterChildren;