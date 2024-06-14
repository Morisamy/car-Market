export namespace ListedCarApplicationEvent {
  export namespace ListedCarCreated {
    export const key = 'listedCar.application.listedCar.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
