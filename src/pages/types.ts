export interface IExampleTypes {
  name: string
  description: string
  grade: number
  children?: IExampleTypes[]
}

export interface IInitialProps {
  data: IExampleTypes[]
}
