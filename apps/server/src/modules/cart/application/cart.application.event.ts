export namespace CartApplicationEvent {
  export namespace CartCreated {
    export const key = 'cart.application.cart.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
