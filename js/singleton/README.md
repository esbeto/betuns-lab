# Two cool ways of creating a Singleton in JS/TS

Additional examples: [StackOverflow](https://stackoverflow.com/questions/1635800/javascript-best-singleton-pattern)

## `singleton-instance-return.ts`
Uses a static property to store and return an instance.

## `singleton-instance-export.ts`
Creates and exports an instance.

## How to run the example:

Use [Deno](https://deno.land/)!

```
deno run singleton.ts
```

Will produce:
```
SingletonInstanceExport: constructor called http://localhost:0.09730509420206723
SingletonInstanceReturn: constructor called http://localhost:0.9539341840545359
---
http://localhost:0.9539341840545359
http://localhost:0.9539341840545359
http://localhost:0.9539341840545359
---
http://localhost:0.09730509420206723
http://localhost:0.09730509420206723
http://localhost:0.09730509420206723
```
