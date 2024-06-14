export namespace SparePartApplicationEvent {
  export namespace SparePartCreated {
    export const key = 'sparePart.application.sparePart.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
