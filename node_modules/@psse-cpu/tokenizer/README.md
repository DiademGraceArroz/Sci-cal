### InfixTokenizer

Use this package if you find it hard to tokenize infix expressions.
Meant to be used for my SE-1222 (Data Structures) class, and not for production use.

### Getting started

##### Installing
`npm i @psse-cpu/tokenizer`

##### Using
```ts
let tokenizer = new InfixTokenizer('((33 - 7) / sin(    90/3 ) + 24.53 ^ 2) * ln(1)')
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // (
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // (
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // 33
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // -
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // 7

/* ...etc, until the last 5 tokens */
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // *
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // ln
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // (
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // 1
tokenizer.hasMoreTokens() // true
tokenizer.readToken() // )
tokenizer.hasMoreTokens() // false
tokenizer.readToken() // undefined
```

Default function names recognized are:
```ts
[
  'sin',
  'cos',
  'tan',
  'arcsin',
  'arccos',
  'arctan',
  'log',
  'ln',
  'sqrt',
  'cbrt'
]
```

If you need more Math functions, just give your own custom list in
the constructor.

```ts
let tokenizer = new InfixTokenizer('cosh(9) + cos(5)', ['sinh', 'cosh'])
// tokens are 

[
  'cosh',
  '(',
  '9',
  ')',
  '+',
  'cos',
  '(',
  '5',
  ')'
]
```
