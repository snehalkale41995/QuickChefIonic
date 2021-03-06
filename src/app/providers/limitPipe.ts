import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitPipe",
})
export class LimitPipe implements PipeTransform {
  transform(value: string, args: any[]): any {
    if (value) {
      let limit = args.length > 0 ? parseInt(args[0], 35) : 35;
      let trail = args.length > 1 ? args[1] : "...";
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
  }
}
