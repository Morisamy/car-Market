export namespace RentalHistoryApplicationEvent {
  export namespace RentalHistoryCreated {
    export const key = 'rentalHistory.application.rentalHistory.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
