export enum EventStatus {
  Pending = 'Pending',
  InProgress = 'In-Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum EventType {
  CheckIn = 'Check-In',
  CheckOut = 'Check-Out',
  Transfer = 'Transfer',
  Maintenance = 'Maintenance',
  Repair = 'Repair',
  Delivery = 'Delivery',
  Return = 'Return',
  Disposal = 'Disposal',
  Shipping = 'Shipping',
  Receiving = 'Receiving',
  CustomsInspection = 'Customs-Inspection',
  Quarantine = 'Quarantine',
  Other = 'Other',
}
