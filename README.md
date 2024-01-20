# Getting Started with **DuoKit**
## parser
```typescript
import {TextNext} from "duokit/parser"
const textCapture = new TextNext()
```

## Parse an XML to JSON
```typescript
import {XML} from "duokit/parser"
XML.parse("<person use:meta=""></person>");
// -> [{tagName: "person", attributes: { "use:meta":""}}]
```
