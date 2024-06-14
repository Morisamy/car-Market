export namespace CartItemApplicationEvent {
  export namespace CartItemCreated {
    export const key = 'cartItem.application.cartItem.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
