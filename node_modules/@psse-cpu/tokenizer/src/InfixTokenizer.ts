const DEFAULT_FUNCTIONS = [
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

export default class InfixTokenizer {
  private expression: string
  private regex: RegExp
  private nextToken?: string

  constructor(
    expression: string, 
    additionalFunctions: string[] = []
  ) {
    this.expression = expression.replaceAll(' ', '') // strip spaces for infix
    const functionsRegex = additionalFunctions.concat(DEFAULT_FUNCTIONS).join('|')

    const regexSource = `\\d+(\\.\\d+)?|${functionsRegex}|[()*/^+-]`
    this.regex = new RegExp(regexSource, 'g')

    this.#advance()
  }

  #advance() {
    const match = this.regex.exec(this.expression)
    this.nextToken = match?.[0]
  }

  hasMoreTokens() {
    return Boolean(this.nextToken)
  }

  readToken() {
    const current = this.nextToken
    this.#advance()
    return current
  }
}