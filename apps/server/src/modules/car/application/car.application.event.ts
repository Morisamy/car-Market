export namespace CarApplicationEvent {
  export namespace CarCreated {
    export const key = 'car.application.car.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
