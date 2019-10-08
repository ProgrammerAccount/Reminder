export class Rutine {
  public recurring_days: Array<number>;
  constructor(
    public id: number,
    public id_task: number,
    public id_user: number,
    reccuringDaysJson: string
  ) {
      this.recurring_days = JSON.parse(reccuringDaysJson);
  }
}
