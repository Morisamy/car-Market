export namespace PurchaseHistoryApplicationEvent {
  export namespace PurchaseHistoryCreated {
    export const key = 'purchaseHistory.application.purchaseHistory.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
