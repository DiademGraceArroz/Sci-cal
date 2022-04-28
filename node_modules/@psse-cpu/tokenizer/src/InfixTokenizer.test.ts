import InfixTokenizer from "./InfixTokenizer"

describe('InfixTokenizer', () => {
  it('does not tokenize empty strings', () => {
    expect(new InfixTokenizer('').hasMoreTokens()).toBe(false)
  })

  it('tokenizes simple expressions', () => {
    const tokenizer = new InfixTokenizer('3+4')
    expect(tokenizer.hasMoreTokens()).toBe(true)
    expect(tokenizer.readToken()).toBe('3')
    expect(tokenizer.hasMoreTokens()).toBe(true)
    expect(tokenizer.readToken()).toBe('+')
    expect(tokenizer.hasMoreTokens()).toBe(true)
    expect(tokenizer.readToken()).toBe('4')
    expect(tokenizer.hasMoreTokens()).toBe(false)
    expect(tokenizer.readToken()).toBe(undefined)
  })

  it('parses for valid tokens', () => {
    const tokenizer = new InfixTokenizer('((33 - 7) / sin(    90/3 ) + 24.53 ^ 2) * ln(1)')
    const tokens = []

    while (tokenizer.hasMoreTokens()) {
      tokens.push(tokenizer.readToken())
    }

    expect(tokens).toEqual([
      '(',
      '(',
      '33',
      '-',
      '7',
      ')',
      '/',
      'sin',
      '(',
      '90',
      '/',
      '3',
      ')',
      '+',
      '24.53',
      '^',
      '2',
      ')',
      '*',
      'ln',
      '(',
      '1',
      ')'
    ])
  })

  it('can recognize additional functions', () => {
    const tokenizer = new InfixTokenizer('cosh(9) + cos(5)', ['sinh', 'cosh'])
    const tokens = []

    while (tokenizer.hasMoreTokens()) {
      tokens.push(tokenizer.readToken())
    }

    expect(tokens).toEqual([
      'cosh',
      '(',
      '9',
      ')',
      '+',
      'cos',
      '(',
      '5',
      ')'
    ])
  })
})