export namespace ListedSparePartApplicationEvent {
  export namespace ListedSparePartCreated {
    export const key = 'listedSparePart.application.listedSparePart.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
